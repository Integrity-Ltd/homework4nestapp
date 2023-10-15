export class Todo {
    private id: number;
    private title: string;
    private description: string;

    constructor(id: number, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescriptoin(): string {
        return this.description;
    }

    setId(id: number): void {
        this.id = id;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setDescription(description: string): void {
        this.description = description;
    }
}
