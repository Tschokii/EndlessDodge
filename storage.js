// Třída pro práci s herními záznamy
class GameStorage {
    constructor() {
        this.STORAGE_KEY = 'endlessDodge_records';
    }

    // Získat všechny záznamy
    getAllRecords() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    }

    // Přidat nový záznam
    addRecord(nickname, time, date) {
        const records = this.getAllRecords();
        const newRecord = {
            nickname,
            time: parseFloat(time),
            date
        };

        records.push(newRecord);
        records.sort((a, b) => b.time - a.time); // Seřadit podle času (sestupně)

        if (records.length > 50) {
            records.pop(); // Zachovat pouze top 50 záznamů
        }

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(records));
    }
}

// Exportovat instanci pro použití v jiných souborech
const gameStorage = new GameStorage();
