/*export class RandomDataGenerator {
 
    static randomEmail(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
 
        return `testuser_${timestamp}_${random}@gmail.com`;
    }
 
}*/

export class RandomDataGenerator {

    private static firstNames = [
        'john',
        'michael',
        'emma',
        'olivia',
        'alex',
        'victor'
    ];

    private static lastNames = [
        'smith',
        'johnson',
        'brown',
        'miller',
        'davis',
        'wilson'
    ];
    static randomFirstName(): string {
        return this.firstNames[
            Math.floor(Math.random() * this.firstNames.length)
        ];
    }

    static randomLastName(): string {
        return this.lastNames[
            Math.floor(Math.random() * this.lastNames.length)
        ];
    }


    static randomEmail(): string {
        const firstName =
            this.firstNames[Math.floor(Math.random() * this.firstNames.length)];

        const lastName =
            this.lastNames[Math.floor(Math.random() * this.lastNames.length)];

        const number = Math.floor(Math.random() * 10000);

        return `${firstName}.${lastName}${number}@gmail.com`;
    }

}