/**
 * ARGUS UAV Mission Control - Core Logic
 * Handles telemetry simulation and UI updates.
 */

class ArgusEngine {
    constructor() {
        this.state = {
            altitude: 452.4,
            velocity: 18.2,
            battery: 84,
            rssi: -64,
            pitch: 2.4,
            roll: -1.2,
            isFlying: false,
            jammingLevel: 12,
            coords: { x: 0, y: 0 }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.startSimulation();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    bindEvents() {
        document.getElementById('btn-takeoff').addEventListener('click', () => this.log('TAKEOFF COMMAND ISSUED'));
        document.getElementById('btn-land').addEventListener('click', () => this.log('LANDING COMMAND ISSUED'));
        document.getElementById('btn-rth').addEventListener('click', () => this.log('RTH COMMAND ISSUED'));
        document.getElementById('btn-kill').addEventListener('click', () => {
            this.log('CRITICAL: KILL SWITCH ACTIVATED');
            document.body.style.filter = 'sepia(1) saturate(2) hue-rotate(-50deg)';
        });
    }

    startSimulation() {
        setInterval(() => {
            // Random walk for telemetry
            this.state.altitude += (Math.random() - 0.5) * 2;
            this.state.velocity += (Math.random() - 0.5) * 0.5;
            this.state.rssi += (Math.random() - 0.5) * 1;
            this.state.pitch += (Math.random() - 0.5) * 0.5;
            this.state.roll += (Math.random() - 0.5) * 0.5;
            
            // Battery drain
            this.state.battery -= 0.01;
            if (this.state.battery < 0) this.state.battery = 0;

            // Map movement
            this.state.coords.x += (Math.random() - 0.5) * 5;
            this.state.coords.y += (Math.random() - 0.5) * 5;

            this.updateUI();
        }, 100);
    }

    updateUI() {
        document.getElementById('val-alt').innerText = this.state.altitude.toFixed(1);
        document.getElementById('val-vel').innerText = this.state.velocity.toFixed(1);
        document.getElementById('val-batt').innerText = Math.floor(this.state.battery);
        document.getElementById('val-rssi').innerText = Math.floor(this.state.rssi);
        document.getElementById('val-attitude').innerText = `${this.state.pitch.toFixed(1)}° / ${this.state.roll.toFixed(1)}°`;

        // Update UAV icon position
        const uav = document.getElementById('uav-icon');
        uav.style.left = `calc(50% + ${this.state.coords.x}px)`;
        uav.style.top = `calc(50% + ${this.state.coords.y}px)`;
        uav.style.transform = `translate(-50%, -50%) rotate(${this.state.velocity * 10}deg)`;

        // Battery color alert
        if (this.state.battery < 20) {
            document.getElementById('val-batt').style.color = 'var(--danger)';
        }
    }

    updateClock() {
        const now = new Date();
        document.getElementById('current-time').innerText = now.toTimeString().split(' ')[0];
    }

    log(message) {
        const logs = document.getElementById('logs');
        const entry = document.createElement('div');
        const time = new Date().toTimeString().split(' ')[0];
        entry.innerText = `[${time}] ${message}`;
        logs.prepend(entry);
    }
}

// Initialize engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.argus = new ArgusEngine();
});
