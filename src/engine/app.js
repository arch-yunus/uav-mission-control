/**
 * ARGUS Tactical Engine v2.0
 * High-performance telemetry simulation and HUD orchestration.
 */

class ArgusTacticalEngine {
    constructor() {
        this.telemetry = {
            alt: 450,
            vel: 18.5,
            batt: 88,
            rssi: -62,
            pitch: 0,
            roll: 0,
            yaw: 0,
            lat: 39.9208,
            lon: 32.8541
        };

        this.status = {
            isArmed: false,
            missionActive: false,
            jamming: 12
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.runCycle();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        this.log("SYSTEM CORE INITIALIZED - ARGUS v2.0");
    }

    setupEventListeners() {
        const actions = {
            'btn-takeoff': "TAKEOFF SEQUENCE INITIATED",
            'btn-land': "LANDING PROTOCOL ACTIVE",
            'btn-rth': "RTH (RETURN TO HOME) ENGAGED",
            'btn-kill': "CRITICAL: EMERGENCY KILL SWITCH"
        };

        Object.entries(actions).forEach(([id, msg]) => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('click', () => {
                    this.log(msg);
                    if (id === 'btn-kill') this.triggerEmergency();
                });
            }
        });
    }

    runCycle() {
        setInterval(() => {
            // Precision Simulation
            this.telemetry.alt += (Math.random() - 0.48) * 0.5;
            this.telemetry.vel += (Math.random() - 0.5) * 0.2;
            this.telemetry.batt -= 0.005;
            this.telemetry.pitch = Math.sin(Date.now() / 1000) * 5;
            this.telemetry.roll = Math.cos(Date.now() / 1500) * 8;
            this.telemetry.yaw += 0.1;

            this.updateHUD();
        }, 50);
    }

    updateHUD() {
        // Numeric Updates
        this.setVal('val-alt', this.telemetry.alt.toFixed(1));
        this.setVal('val-vel', (this.telemetry.vel * 3.6).toFixed(1)); // m/s to km/h
        this.setVal('val-batt', Math.floor(this.telemetry.batt));
        this.setVal('val-rssi', Math.floor(this.telemetry.rssi + Math.random() * 2));
        this.setVal('val-attitude', `${this.telemetry.pitch.toFixed(1)}° / ${this.telemetry.roll.toFixed(1)}°`);

        // Map & Visuals
        const uav = document.getElementById('uav-icon');
        if (uav) {
            uav.style.transform = `translate(-50%, -50%) rotate(${this.telemetry.yaw}deg)`;
            uav.style.filter = `drop-shadow(0 0 10px var(--accent-glow))`;
        }

        // EW Bars
        this.setBar('bar-jamming', 10 + Math.random() * 5);
        this.setBar('bar-spoofing', 2 + Math.random() * 2);
    }

    setVal(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    setBar(id, percent) {
        const el = document.getElementById(id);
        if (el) el.style.width = `${percent}%`;
    }

    updateClock() {
        const el = document.getElementById('current-time');
        if (el) el.textContent = new Date().toTimeString().split(' ')[0];
    }

    log(msg) {
        const logs = document.getElementById('logs');
        if (!logs) return;
        const entry = document.createElement('div');
        entry.innerHTML = `<span style="color:var(--accent-glow)">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        logs.prepend(entry);
        if (logs.children.length > 50) logs.lastChild.remove();
    }

    triggerEmergency() {
        document.body.style.animation = "shake 0.5s infinite";
        document.querySelector('.dashboard').style.filter = "sepia(1) saturate(5) hue-rotate(-50deg) blur(2px)";
        this.log("CORE MELTDOWN DETECTED");
    }
}

// Global Shake Animation
const styleElement = document.createElement('style');
styleElement.textContent = `
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
    }
`;
document.head.appendChild(styleElement);

document.addEventListener('DOMContentLoaded', () => {
    window.tacticalEngine = new ArgusTacticalEngine();
});
