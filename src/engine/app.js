/**
 * ARGUS Tactical Engine v3.0 - Sovereign
 * Ultra-performance HUD orchestration with voice synthesis and real-time spectrum analysis.
 */

class ArgusTacticalEngine {
    constructor() {
        this.telemetry = {
            alt: 450, vel: 18.5, batt: 88, rssi: -62,
            pitch: 0, roll: 0, yaw: 0,
            lat: 39.9208, lon: 32.8541
        };

        this.targets = [
            { id: 'TGT-01', x: 20, y: 30, type: 'hostile' },
            { id: 'TGT-02', x: 70, y: 60, type: 'friendly' }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSpectrum();
        this.runCycle();
        this.voice("System online. Argus tactical core active.");
        this.log("CORE_OS v3.0 READY");
    }

    setupEventListeners() {
        const actions = {
            'btn-takeoff': "Takeoff sequence initiated. Clearing perimeter.",
            'btn-land': "Autonomous landing protocol engaged.",
            'btn-rth': "Return to home protocol active. Navigating to base.",
            'btn-kill': "EMERGENCY KILL SWITCH ENGAGED. SYSTEMS SHUTTING DOWN."
        };

        Object.entries(actions).forEach(([id, msg]) => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('click', () => {
                    this.log(msg.toUpperCase());
                    this.voice(msg);
                    if (id === 'btn-kill') this.triggerEmergency();
                });
            }
        });
    }

    setupSpectrum() {
        const canvas = document.getElementById('spectrum-canvas');
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    runCycle() {
        setInterval(() => {
            this.simulateData();
            this.updateHUD();
            this.drawSpectrum();
        }, 50);
    }

    simulateData() {
        this.telemetry.alt += (Math.random() - 0.48) * 0.4;
        this.telemetry.vel += (Math.random() - 0.5) * 0.1;
        this.telemetry.batt -= 0.001;
        this.telemetry.pitch = Math.sin(Date.now() / 800) * 12;
        this.telemetry.roll = Math.cos(Date.now() / 1200) * 15;
        this.telemetry.yaw += 0.2;

        // Simulate target movement
        this.targets.forEach(t => {
            t.x += (Math.random() - 0.5) * 0.5;
            t.y += (Math.random() - 0.5) * 0.5;
        });
    }

    updateHUD() {
        this.setVal('val-alt', this.telemetry.alt.toFixed(1));
        this.setVal('val-vel', (this.telemetry.vel * 3.6).toFixed(1));
        this.setVal('val-batt', Math.floor(this.telemetry.batt));
        
        // Gyro Update
        const gyro = document.getElementById('gyro-inner');
        if (gyro) {
            gyro.style.transform = `rotate(${this.telemetry.roll}deg) translateY(${this.telemetry.pitch * 2}px)`;
        }

        // UAV Icon
        const uav = document.getElementById('uav-icon');
        if (uav) uav.style.transform = `translate(-50%, -50%) rotate(${this.telemetry.yaw}deg)`;

        // Targets
        this.renderTargets();

        // Clock
        const clock = document.getElementById('current-time');
        if (clock) clock.textContent = new Date().toLocaleTimeString();
    }

    renderTargets() {
        const layer = document.getElementById('targets-layer');
        if (!layer) return;
        layer.innerHTML = '';
        this.targets.forEach(t => {
            const el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.left = `${t.x}%`;
            el.style.top = `${t.y}%`;
            el.style.transform = 'translate(-50%, -50%)';
            el.innerHTML = `
                <div style="width:10px; height:10px; border:1px solid ${t.type === 'hostile' ? 'var(--danger-glow)' : 'var(--accent-glow)'}; transform:rotate(45deg)"></div>
                <div style="font-size:8px; color:white; margin-top:5px; font-family:var(--font-mono)">${t.id}</div>
            `;
            layer.appendChild(el);
        });
    }

    drawSpectrum() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 5) {
            const val = Math.random() * h * 0.6;
            ctx.moveTo(i, h);
            ctx.lineTo(i, h - val);
        }
        ctx.stroke();
    }

    voice(text) {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1;
        utterance.pitch = 0.8; // Robotic feel
        window.speechSynthesis.speak(utterance);
    }

    log(msg) {
        const logs = document.getElementById('logs');
        if (!logs) return;
        const entry = document.createElement('div');
        entry.style.marginBottom = '4px';
        entry.innerHTML = `<span style="color:var(--accent-glow)">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        logs.prepend(entry);
        if (logs.children.length > 20) logs.lastChild.remove();
    }

    triggerEmergency() {
        document.body.style.animation = "shake 0.1s infinite";
        setTimeout(() => {
            document.body.style.filter = "invert(1) grayscale(1)";
            this.voice("Critical failure. Protocol terminated.");
        }, 1000);
    }

    setVal(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }
}

// Shake animation for emergency
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    window.engine = new ArgusTacticalEngine();
});
