'use strict'

import VueComponents from 'components'
import Page from 'views/index'

const idx = new VueComponents({
    render: h => h(Page)
}).$mount('#idx');