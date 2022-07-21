import store from "@/store"
import axios from 'axios'
import Vue from 'vue'

store.subscribe(mutation => {  
    switch (mutation.type) {
        case 'SET_TOKEN':
            if (mutation.payload) {
                Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            } else {
                Vue.prototype.$axios.defaults.headers.common['Authorization'] = null
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
                localStorage.removeItem('refreshToken')
            }
            break;
    }
})