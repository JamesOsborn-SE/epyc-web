import { describe, it, expect, vi } from 'vitest'

import { mount, flushPromises } from '@vue/test-utils'
import Paint from '../Paint.vue'


describe('Paint', () => {
  it('renders properly', async () => {
    vi.mock('painterro',() => {
      return {
        default: () =>({
          show: vi.fn()
        })
      }
    })
    const wrapper = mount(Paint)
    await new Promise(r => setTimeout(r));
    await flushPromises();
    expect(wrapper.find('#painterro').exists()).toBe(true)
  })
})
