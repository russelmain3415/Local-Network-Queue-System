const fs = require('fs');
const path = require('path');

class JSONDatabase {
    constructor(filePath, initialData = {}) {
        this.filePath = filePath;
        this.data = initialData;
        this.load();
    }

    load() {
        if (fs.existsSync(this.filePath)) {
            try {
                const content = fs.readFileSync(this.filePath, 'utf8');
                this.data = JSON.parse(content);
            } catch (err) {
                console.error(`Error loading database from ${this.filePath}:`, err);
                // Keep initialData if parse fails
            }
        } else {
            this.save();
        }
    }

    save() {
        try {
            const content = JSON.stringify(this.data, null, 2);
            fs.writeFileSync(this.filePath, content, 'utf8');
        } catch (err) {
            console.error(`Error saving database to ${this.filePath}:`, err);
        }
    }

    // Atomic update to prevent race conditions if multiple requests hit at once
    // though Node is single-threaded, it's good practice for async-like behavior
    update(callback) {
        callback(this.data);
        this.save();
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        this.save();
    }
}

module.exports = JSONDatabase;
