export const state = () => ({
    address: undefined,
    balance: '0',
    pkb_balance: '0',
    totalBuy : 0,
})
  
export const mutations = {
    setAddress(state, addr) {
        // console.log("STORE set address ", addr);
        state.address = addr;
    },
    setBalance(state, bal) {
        state.balance = bal;
    },
    setPKBBalance(state, bal) {
        state.pkb_balance = bal;
    },
    setTotalBuys(state, v) 
    {
        console.log('Set total buys ', v);
        state.totalBuy = v;
    }
}

/*add(state, text) {
        state.list.push({
        text,
        done: false
        })
    },
    remove(state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle(state, todo) {
        todo.done = !todo.done
    }
}*/