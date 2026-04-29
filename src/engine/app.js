/**
 * ARGUS Tactical Engine v3.0 - Sovereign
 * Ultra-performance HUD orchestration with voice synthesis and real-time spectrum analysis.
 */

class ArgusTacticalEngine {
    constructor() {
        this.activeUnit = 'ARGUS-01';
        this.telemetry = {
            alt: 450, vel: 18.5, batt: 88, rssi: -62,
            pitch: 0, roll: 0, yaw: 0,
            lat: 39.9208, lon: 32.8541
        };

        this.targets = [
            { id: 'ALPHA-01', x: 25, y: 35, type: 'hostile', speed: 0.2 },
            { id: 'BRAVO-07', x: 75, y: 65, type: 'friendly', speed: 0.1 },
            { id: 'UNKNOWN', x: 45, y: 15, type: 'unknown', speed: 0.4 }
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSpectrum();
        this.setup3DEffects();
        this.runCycle();
        
        // Hoşgeldin mesajı
        setTimeout(() => {
            this.voice("Sistem çevrimiçi. Argus taktik çekirdek aktif. Egemenlik tesis ediliyor.");
            this.log("SİSTEM_OS v3.0-SOVEREIGN AKTİF");
        }, 1000);
    }

    setupEventListeners() {
        // Kontrol Butonları
        const actions = {
            'btn-takeoff': "Kalkış sekansı başlatıldı. Çevre güvenliği doğrulanıyor.",
            'btn-land': "Otonom iniş protokolü devreye girdi. İniş alanı taranıyor.",
            'btn-rth': "Eve dönüş protokolü aktif. Üsse rota planlanıyor.",
            'btn-kill': "ACİL DURUM KESİCİ DEVREDE. TÜM SİSTEMLER KAPATILIYOR!"
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

        // Sürü Yönetimi (Swarm Switch)
        const swarmItems = document.querySelectorAll('.swarm-item');
        swarmItems.forEach(item => {
            item.addEventListener('click', () => {
                const unit = item.getAttribute('data-unit');
                this.switchUnit(unit);
                
                // UI Güncelleme
                swarmItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    setup3DEffects() {
        const dashboard = document.getElementById('main-dashboard');
        if (!dashboard) return;

        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            dashboard.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
        });
    }

    setupSpectrum() {
        const canvas = document.getElementById('spectrum-canvas');
        if (!canvas) return;
        this.ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    switchUnit(id) {
        this.activeUnit = id;
        document.getElementById('active-unit-id').textContent = id;
        this.log(`${id} ÜNİTESİNE BAĞLANILDI. SENKRONİZASYON TAMAMLANDI.`);
        this.voice(`${id} ünitesine geçiş yapıldı.`);
        
        // Telemetriyi hafifçe sıfırla/değiştir (simülasyon için)
        this.telemetry.batt = 70 + Math.random() * 25;
        this.telemetry.alt = 400 + Math.random() * 100;
    }

    runCycle() {
        setInterval(() => {
            this.simulateData();
            this.updateHUD();
            this.drawSpectrum();
        }, 50);
    }

    simulateData() {
        // Yumuşak telemetri değişimi
        this.telemetry.alt += (Math.random() - 0.45) * 0.5;
        this.telemetry.vel += (Math.random() - 0.5) * 0.05;
        this.telemetry.batt -= 0.0005;
        
        // Gyro simülasyonu
        this.telemetry.pitch = Math.sin(Date.now() / 1000) * 8;
        this.telemetry.roll = Math.cos(Date.now() / 1500) * 12;
        this.telemetry.yaw = (this.telemetry.yaw + 0.1) % 360;

        // Hedef hareketi
        this.targets.forEach(t => {
            t.x += (Math.random() - 0.5) * t.speed;
            t.y += (Math.random() - 0.5) * t.speed;
            
            // Sınır kontrolü
            if (t.x < 5) t.x = 95;
            if (t.x > 95) t.x = 5;
            if (t.y < 5) t.y = 95;
            if (t.y > 95) t.y = 5;
        });

        // RSSI simülasyonu
        this.telemetry.rssi = -60 - Math.random() * 10;
    }

    updateHUD() {
        this.setVal('val-alt', this.telemetry.alt.toFixed(1));
        this.setVal('val-vel', (this.telemetry.vel * 3.6).toFixed(1));
        this.setVal('val-batt', Math.floor(this.telemetry.batt));
        this.setVal('val-rssi', `${Math.floor(this.telemetry.rssi)} DBM`);
        
        const rssiBar = document.getElementById('bar-rssi');
        if (rssiBar) rssiBar.style.width = `${Math.abs(this.telemetry.rssi + 100)}%`;

        // Gyro Güncelleme
        const gyro = document.getElementById('gyro-inner');
        if (gyro) {
            gyro.style.transform = `rotate(${this.telemetry.roll}deg) translateY(${this.telemetry.pitch * 3}px)`;
        }

        // UAV İkonu
        const uav = document.getElementById('uav-icon');
        if (uav) uav.style.transform = `translate(-50%, -50%) rotate(${this.telemetry.yaw}deg)`;

        // Hedefleri Çiz
        this.renderTargets();

        // Saat
        const clock = document.getElementById('current-time');
        if (clock) clock.textContent = new Date().toLocaleTimeString();
    }

    renderTargets() {
        const layer = document.getElementById('targets-layer');
        if (!layer) return;
        
        // Mevcut markerları yönet (performans için temizlik yerine güncelleme yapılabilir ama şimdilik basit tutalım)
        layer.innerHTML = '';
        this.targets.forEach(t => {
            const marker = document.createElement('div');
            marker.className = 'target-marker';
            marker.style.left = `${t.x}%`;
            marker.style.top = `${t.y}%`;
            
            let color = 'var(--accent-glow)';
            if (t.type === 'hostile') color = '#ff0055';
            if (t.type === 'unknown') color = '#ffcc00';
            
            marker.style.borderColor = color;
            marker.innerHTML = `
                <div class="target-label" style="color:${color}">${t.id} [${t.type.toUpperCase()}]</div>
            `;
            layer.appendChild(marker);
        });
    }

    drawSpectrum() {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.clearRect(0, 0, w, h);
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.5)';
        ctx.lineWidth = 2;
        
        const step = 4;
        for (let i = 0; i < w; i += step) {
            // Arkaplan gürültüsü
            let val = Math.random() * h * 0.3;
            
            // Sinyal tepeleri (spike)
            if (i > w * 0.3 && i < w * 0.35) val += Math.random() * h * 0.5;
            if (i > w * 0.7 && i < w * 0.72) val += Math.random() * h * 0.4;
            
            ctx.moveTo(i, h);
            ctx.lineTo(i, h - val);
        }
        ctx.stroke();
    }

    voice(text) {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';
        utterance.rate = 1.0;
        utterance.pitch = 0.8; // Hafif robotik/taktik ses tonu
        window.speechSynthesis.speak(utterance);
    }

    log(msg) {
        const logs = document.getElementById('logs');
        if (!logs) return;
        const entry = document.createElement('div');
        entry.style.marginBottom = '6px';
        entry.style.borderLeft = '2px solid var(--accent-glow)';
        entry.style.paddingLeft = '8px';
        entry.innerHTML = `<span style="color:var(--accent-glow); font-size:9px;">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
        logs.prepend(entry);
        
        if (logs.children.length > 25) logs.lastChild.remove();
    }

    triggerEmergency() {
        document.body.style.animation = "shake 0.1s infinite";
        setTimeout(() => {
            document.body.style.filter = "invert(1) grayscale(1) contrast(2)";
            this.voice("Kritik sistem hatası. Bağlantı kesildi. Egemenlik sona erdi.");
            this.log("!!! KRİTİK HATA: SİSTEM ÇÖKTÜ !!!");
        }, 1500);
    }

    setVal(id, val) {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    }
}

// Shake animasyonu (CSS'e ek olarak buraya da inject edelim)
const styleInject = document.createElement('style');
styleInject.textContent = `
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
    }
`;
document.head.appendChild(styleInject);

document.addEventListener('DOMContentLoaded', () => {
    window.engine = new ArgusTacticalEngine();
});
