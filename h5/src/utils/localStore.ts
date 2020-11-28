/**
 * @description 本地存储处理
 */

export default class LocalStore {
    private store!: string;
    constructor(protected readonly key: string) {
        this.initStore()
    }
    public initStore() {
        this.store = localStorage.getItem(this.key) ?? '';
    }
    public toJson(): object {
        try {
            return JSON.parse(this.store)
        } catch (error) {
            return {}
        }
    }
    public toArray(): any[] {
        try {
            const arr = JSON.parse(this.store)
            return typeof arr.length !== 'undefined' ? arr : []
        } catch (error) {
            return []
        }
    }
    public toText(): string {
        return this.store
    }
    public toNumber(): number {
        return +this.store
    }
    public writeText(text: string) {
        localStorage.setItem(this.key, text)
    }
    public writeJson(json: object) {
        localStorage.setItem(this.key, JSON.stringify(json))
    }
}