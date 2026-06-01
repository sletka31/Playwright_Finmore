export class DataGenerator {
 
    static generateRandomString(length: number = 8): string {
 
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
 
        for (let i = 0; i < length; i++) {
 
            result += chars.charAt(Math.floor(Math.random() * chars.length));
 
        }
 
        return result;
 
    }
 
    static generateName(): string {
 
        const firstNames = [
            'John',
            'Michael',
            'David',
            'Alex',
            'Victor',
            'Anna',
            'Olivia',
            'Emma',
            'Sophia'
        ];
 
        const lastNames = [
            'Smith',
            'Johnson',
            'Brown',
            'Williams',
            'Taylor',
            'Miller',
            'Wilson'
        ];
 
        const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
 
        const lastName =
            lastNames[Math.floor(Math.random() * lastNames.length)];
 
        return `${firstName} ${lastName}`;
 
    }
 
    static generateEmail(domain: string = 'test.com'): string {
 
        const timestamp = Date.now();
 
        const randomPart = this.generateRandomString(6);
 
        return `user_${randomPart}_${timestamp}@${domain}`;
 
    }
 
    static generatePostTitle(): string {
 
        return `API Test Post ${Date.now()}`;
 
    }
 
    static generatePostContent(): string {
 
        return `Auto generated content ${this.generateRandomString(20)}`;
 
    }

    static generatePostExcerpt(): string {
 
        return `Auto generated excerpt ${this.generateRandomString(10)}`;
 
    }
 
}