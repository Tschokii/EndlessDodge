# EndlessDodge - Dokumentace hry

## 1. Popis funkcí aplikace

### Základní koncept
EndlessDodge je survival hra, kde se hráč snaží přežít co nejdéle. Cílem je dosáhnout nejdelšího možného času. Hra postupně zvyšuje obtížnost přidáváním různých typů nepřátel.

### Hlavní herní mechaniky

#### Pohyb hráče
- Ovládání pomocí kláves WSAD
- Plynulý pohyb všemi směry
- Omezení pohybu v rámci herní plochy

#### Systém úhybu (Dodge)
- Aktivace klávesou **P**
- Dočasná nesmrtelnost při použití
- Cooldown 10 sekund mezi použitími

#### Progresivní obtížnost
- Postupné přidávání nových typů nepřátel
- Zvyšování rychlosti nepřátel
- Různé pohyby nepřátel

#### Systém skóre
- Měření času
- Ukládání nejlepších časů
- Možnost porovnání s předchozími pokusy

## 2. Typy uživatelů

### Hráč
- Jediný typ uživatele v aplikaci
- Má přístup ke všem funkcím hry:
  - Spuštění nové hry
  - Nastavení ovládání
  - Nastavení zvuku
  - Zobrazení nejlepších časů
  - Hraní hry

## 3. Vzhled a funkce aplikace

### Hlavní menu
- Jemný červený design
- Animované pozadí
- 3 tlačítka:
  - **Play** - zapne hru
  - **Records** - Otevře historii našich rekordů
  - **Settings** - Dostane nás do nastavení hry

### Herní obrazovka (play)
- Minimalistický design s tmavým pozadím
- Hlavní prvky:
  - Herní plocha - Arena (canvas)
  - Časomíra v pravém horním rohu
  - Ready tlačítko pro start
  - Odpočet před začátkem hry

### Typy nepřátel

#### Vertikální nepřátelé (červené kolečka)
- Pohyb shora dolů nebo zdola nahoru
- Postupné zrychlování

#### Horizontální nepřátelé
- Pohyb zleva doprava nebo zprava doleva
- Objevují se později v průběhu hry

#### Statické nebezpečné zóny
- Velké kruhové oblasti
- Nejprve varování (blikání)
- Poté se stanou smrtícími
- Objevují se pod hráčem

#### Zužující se aréna
- Nebezpečné okraje, které se rozšiřují a zužují
- Nutí hráče pohybovat se v centrální části arény

## 4. Použité technologie

### Frontend
- **HTML5 Canvas** pro vykreslování hry
- **Vanilla JavaScript** s OOP přístupem
- **CSS3** pro styling

### Zvukový systém
- **Web Audio API**
- Vlastní **Audio Manager** pro správu zvuků
- Podpora různých zvukových efektů

### Ukládání dat
- **Local Storage** pro:
  - Nejlepší časy
  - Nastavení ovládání
  - Nastavení zvuku

## 5. Systém ukládání herních záznamů

### Třída `GameStorage`
Aplikace používá specializovanou třídu pro správu herních záznamů, která zajišťuje:
- Ukládání nejlepších časů
- Správu osobních rekordů hráčů
- Omezení na top 50 záznamů

#### Struktura dat
```javascript
{
    nickname: string,    // přezdívka hráče
    time: number,       // dosažený čas
    date: string        // datum záznamu
}

Hlavní funkce
Získání všech záznamů
javascriptCopygetAllRecords() {
    return JSON.parse(localStorage.getItem('endlessDodge_records')) || [];
}

Načítá všechny uložené záznamy z Local Storage
Vrací prázdné pole, pokud žádné záznamy neexistují

Přidání nového záznamu
javascriptCopyaddRecord(nickname, time, date) {
    // Vytvoření nového záznamu
    // Seřazení podle času
    // Omezení na top 50
    // Uložení do Local Storage
}

Automatické řazení podle nejlepšího času
Limitování na 50 nejlepších výsledků
Kontrola nových rekordů

Kontrola osobních rekordů
javascriptCopyisNewRecord(newRecord) {
    // Porovnání s předchozími výsledky hráče
}

getPersonalBest(nickname) {
    // Získání nejlepšího osobního času
}

Sledování osobních rekordů
Možnost porovnání s předchozími výsledky

6. Proces ukládání dat

- Po skončení hry se vytvoří nový záznam s:

    Přezdívkou hráče
    Dosaženým časem
    Aktuálním datem


- Záznam je přidán do existující kolekce:

    Seřazení všech záznamů podle času
    Kontrola, zda jde o osobní rekord
    Omezení na maximálně 50 záznamů
    Uložení aktualizované kolekce do Local Storage


- Systém porovná nový čas s:

    Celkovými hráčovo nejlepšími časy
    Osobním rekordem hráče


- Výsledek je zobrazen hráči v records:

    Informace o novém rekordu
    Informace o top 3 rekordech
    Historie 50 času

7. Herní logika

javascriptCopyclass Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(this.canvas.width, this.canvas.height);
        this.audioManager = new AudioManager();
        this.waveManager = new WaveManager(this.canvas);
    }
}

Inicializuje herní prostředí
Spravuje herní smyčku
Koordinuje ostatní komponenty

Herní smyčka

javascriptCopygameLoop() {
    if (this.isGameRunning) {
        this.player.update()
        this.waveManager.update()
        this.checkCollisions()
        this.draw()
        requestAnimationFrame(() => this.gameLoop())
    }
}

- Systém nepřátel
    
    - Typy nepřátel

        <antArtifact identifier="enemies-diagram" type="application/vnd.ant.mermaid" title="Enemies System Diagram">
        graph TD
            WaveManager[Wave Manager] --> Enemy1[Enemy Type 1<br/>Vertikální pohyb]
            WaveManager --> Enemy2[Enemy Type 2<br/>Horizontální pohyb]
            WaveManager --> Enemy3[Enemy Type 3<br/>Statický s varováním]
            WaveManager --> Enemy4[Enemy Type 4<br/>Rostoucí okraje]

        Enemy1 --> Movement1[Pohyb shora dolů]
        Enemy2 --> Movement2[Pohyb zleva doprava]
        Enemy3 --> Warning[Fáze varování]
        Enemy3 --> Deadly[Smrtící fáze]
        Enemy4 --> Growth[Růst/Zmenšování]

    - WaveManager

        class WaveManager {
        constructor(canvas) {
            this.enemies = [];
            this.enemy2 = [];
            this.enemy3 = [];
            this.enemy4 = null;
            this.currentWave = 0;
        }
    }

    Časování nepřátel kdy se začnou objevovat:

        Enemy 1: Start v čase 3.3s
        Enemy 2: Start v čase 13.0s
        Enemy 3: Start v čase 32.0s
        Enemy 4: Start v čase 51.0s

- Systém hráče

    class Player {
        constructor(canvasWidth, canvasHeight) {
            this.x = canvasWidth / 2;
            this.y = canvasHeight / 2;
            this.width = 20;
            this.height = 20;
            this.speed = 3;
        }
    }


- Pohybový systém

                                                --> Aktualizace pozice

                        Pohybový systém -->

                                                --> Kontrola hranic
Vstup klávesnice -->    
                                                --> 10s cooldown

                        Systém dodge -->       
                                                
                                                --> Dočasná nesmrtelnost 

- systém kolizí

        checkCollisions(player) {
        // Kontrola kolizí s různými typy nepřátel
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        return distance < radius && !player.isDodging;
    }

- audio systém

    class AudioManager {
        constructor() {
            this.welcomeSong = new Audio('./WelcomeSong.mp3');
            this.sounds = {
                voice_5: new Audio('./voice_5.mp3'),
                // další zvuky
            };
        }
    }

### Zvukové efekty

- **Odpočítávání** (5, 4, 3, 2, 1, GO) – Vlastnoručně dabované.
- **Hudba v pozadí** s fade-in efektem.
- **Nastavitelná hlasitost** pro hudbu a zvukové efekty.

### Stavový systém

#### Ready stav
- Zobrazení tlačítka **"Ready"**.
- Čekání na start hry.

#### Odpočet
- **5 sekundový odpočet**.
- Zvukové efekty (odpočítávání).

#### Hraní
- Aktivní herní smyčka.
- Měření času.
- Generování nepřátel.

#### Game Over
- Zastavení hry.
- Uložení skóre.
- Přesměrování na výsledkovou obrazovku.
