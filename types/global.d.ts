interface NodeModule {
    hot?:{
        accept(dependencies?: string | string[], callback?: () => void): void;
        dispose(callback: (data: boolean) => void): void;
    }
}