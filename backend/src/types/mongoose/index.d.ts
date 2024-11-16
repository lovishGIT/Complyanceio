declare module 'mongoose' {
    interface Cursor<DocType, Options> {
        [Symbol.asyncIterator](): AsyncIterableIterator<DocType>;
        map<ResultType>(
            fn: (res: DocType) => ResultType
        ): Cursor<ResultType, Options>;
    }
}
