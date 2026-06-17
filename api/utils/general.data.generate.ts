export class RandomDataGenerator {
 
    static randomEmail(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
 
        return `testuser_${timestamp}_${random}@gmail.com`;
    }
 
}

