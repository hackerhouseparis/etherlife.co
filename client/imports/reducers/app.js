
import { handleActions, createAction } from 'redux-actions'

const intialState = {
  contractsList: [
    { publicKey: 'ewlfheroigheriogero' },
    { publicKey: 'regregrtrwhrtwhrthr' },
    { publicKey: 'rtwhrtbtrbhrthbrtbr' },
    { publicKey: 'awefergrehtrhrhrtrt' },
    { publicKey: 'brbrtbrtwbrwtbrwrtw' },
  ],
  publicKey: null,
  messageFlash: 'test flash message'
}

export const setPublicKey = createAction('SET_PUBLIC_KEY')
export const setContracts = createAction('SET_CONTRACTS')
export const setFlashMessage = createAction('SET_FLASH_MESSAGE')

export default handleActions({

  SET_CONTRACTS: (state, { payload: contractsList }) => ({ ...state, contractsList }),

  SET_PUBLIC_KEY: (state, { payload: publicKey }) => ({ ...state, publicKey }),

  SET_FLASH_MESSAGE: (state, { payload: messageFlash }) => ({ ...state, messageFlash }),

}, intialState)
