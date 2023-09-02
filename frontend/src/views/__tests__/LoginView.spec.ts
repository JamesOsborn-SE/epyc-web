import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'
import { useAuth } from '@/stores/auth'
import { useRoute, } from 'vue-router'
import { nextTick } from 'vue'

vi.mock('vue-router', () => ({
  useRoute: vi.fn().mockReturnValue({
    query: { code: '123' },
  }),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    beforeEach: vi.fn(),
    afterEach: vi.fn(),
  }),
  createRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    beforeEach: vi.fn(),
  }),
  createWebHistory: vi.fn(),
}));

vi.mock('@/stores/auth', () =>({
  useAuth: vi.fn().mockReturnValue({
    getAuthFromCode: vi.fn().mockResolvedValue(""),
    login: vi.fn().mockResolvedValue(""),
  })
}))

describe('LoginView.vue', () => {


  let wrapper: any
  let authStub: any
  let routeStub: any
  beforeEach(() => {

  })

  it('renders login form', () => {


    authStub = useAuth()
    authStub.hasExpired = true
    routeStub = useRoute()

    wrapper = mount(LoginView, {
      global: {
        plugins: [createTestingPinia()],
      }
    })

    const test = wrapper.vm
    expect(wrapper.find('#loginForm').exists()).toBe(true)
  })

  it('submits form and calls login method', async () => {
    wrapper.find('#username').setValue('testuser')
    wrapper.find('#password').setValue('testpass')
    wrapper.find('form').trigger('submit')
    await nextTick()
    expect(authStub.login).toHaveBeenCalledWith('testuser', 'testpass')
  })


  // Add more tests as needed...
})
