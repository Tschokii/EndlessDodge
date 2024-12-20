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
        return this.isNewRecord(newRecord);
    }

    // Zkontrolovat, zda je to nový rekord
    isNewRecord(newRecord) {
        const records = this.getAllRecords();
        if (records.length === 0) return true;
        
        // Porovnat s posledním osobním rekordem hráče
        const lastPersonalRecord = records.find(record => record.nickname === newRecord.nickname);
        if (!lastPersonalRecord) return true;
        
        return newRecord.time > lastPersonalRecord.time;
    }

    // Získat nejlepší osobní rekord pro přezdívku
    getPersonalBest(nickname) {
        const records = this.getAllRecords();
        const personalRecords = records.filter(record => record.nickname === nickname);
        return personalRecords.length > 0 ? personalRecords[0] : null;
    }
}

// Exportovat instanci pro použití v jiných souborech
const gameStorage = new GameStorage();