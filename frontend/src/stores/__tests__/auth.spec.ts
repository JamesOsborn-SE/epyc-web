import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuth } from '../auth'

describe('Auth Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('has null state', () => {
        const auth = useAuth()
        expect(auth.username).toBe(null)
        expect(auth.accessToken).toBe(null)
        expect(auth.refreshToken).toBe(null)
        expect(auth.refreshTokenTimeout).toBe(null)
        expect(auth.refreshTokenExpiresAt).toBe(null)
    })
    describe('valid token', () => {
        it('gets headers', () => {
            const auth = useAuth()
            const accessToken = "token"
            auth.accessToken = accessToken
            auth.refreshTokenExpiresAt = Date.now() + 500
            const headers = auth.getHeaders
            expect(headers).toStrictEqual({
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
        })
    })

})