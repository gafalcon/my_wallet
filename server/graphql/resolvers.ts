
export const resolvers = {
    Query: {
        getBanks: () => {
            return []
        },
        getBank: (_, {name}) => {
            return {
                id: 1,
                name
            }
        }

    }
}
