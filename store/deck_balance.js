export const state = () => ({
    balances: [],
    pokeTypes : 0,
    balanceId : 1

})

export const getters = 
{
    blance: (state) => state.balanceId
}
  
export const mutations = {
    setTotalTypes(state, pokeTypes) 
    {
        state.pokeTypes = pokeTypes;
    },
    setBalanceId(state, balanceId)
    {
        console.log("Balance Id change ", balanceId);
        state.balanceId = balanceId;
    },
    setDeckBalance(state, deck) 
    {
        console.log('STORE _>_>_> call store to set balance! : ',  deck );
        state.balances = deck;
    },
}