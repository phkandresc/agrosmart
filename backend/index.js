require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ WARNING: Supabase credentials missing. Check .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- ARDUINO ENDPOINTS ---

// 1. Receive Readings from Arduino & Send Pending Commands back
// Optimization: Arduino sends data, and we reply with any commands it needs to run.
app.post('/api/arduino/data', async (req, res) => {
    const { temperature, humidity, soil_moisture, light_level, device_id } = req.body;
    const currentDeviceId = device_id || 'default_device';

    console.log(`[Arduino] Received data from ${currentDeviceId}:`, req.body);

    // 1. Save Reading to Supabase
    const { error: insertError } = await supabase
        .from('readings')
        .insert([{
            temperature,
            humidity,
            soil_moisture,
            light_level,
            device_id: currentDeviceId
        }]);

    if (insertError) {
        console.error('[Supabase] Error saving reading:', insertError);
        return res.status(500).json({ error: 'Failed to save data' });
    }

    // 2. Check for Pending Commands for this device
    const { data: commands, error: commandError } = await supabase
        .from('commands')
        .select('*')
        .eq('device_id', currentDeviceId)
        .eq('is_executed', false);

    if (commandError) {
        console.error('[Supabase] Error fetching commands:', commandError);
    }

    // 3. Mark commands as executed (so we don't send them again)
    if (commands && commands.length > 0) {
        const commandIds = commands.map(c => c.id);

        // Optimistic update: mark as executed immediately when sent to device
        const { error: updateError } = await supabase
            .from('commands')
            .update({ is_executed: true })
            .in('id', commandIds);

        if (updateError) console.error('Error updating commands:', updateError);

        console.log(`[Arduino] Sending ${commands.length} commands to device.`);
    }

    // 4. Send response to Arduino
    // The Arduino should parse the 'commands' array.
    res.json({
        success: true,
        commands: commands || []
    });
});


// --- FRONTEND ENDPOINTS ---

// 1. Get Latest Readings (for Dashboard)
app.get('/api/readings/latest', async (req, res) => {
    const { data, error } = await supabase
        .from('readings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10); // Get last 10 readings

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 2. Send Command to Arduino (from Frontend UI)
app.post('/api/commands', async (req, res) => {
    const { device_id, command_type, payload } = req.body;

    if (!command_type) {
        return res.status(400).json({ error: 'command_type is required' });
    }

    // Insert command as pending
    const { data, error } = await supabase
        .from('commands')
        .insert([{
            device_id: device_id || 'invernadero_1', // Default ID match with Simulator/Arduino
            command_type,
            payload: payload || {},
            is_executed: false // It starts as pending
        }])
        .select();

    if (error) {
        console.error('Error queuing command:', error);
        return res.status(500).json({ error: error.message });
    }

    console.log(`[Frontend] Queued command: ${command_type} for ${device_id || 'invernadero_1'}`);
    res.json({ success: true, command: data[0] });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
