const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
    return {
        UserLogin: null,
        IsLogin: false,
        IsRole: null,
        HistoryUrl: null,
        product_id: null,
        product_type_slug: null,
        product_test_type: null,
        IsChangeForm: {},
        IsHideLiveChat: false,

        breadcrumb: [{
            title: null,
            menu: []
        }],
        
        isDraft: false,
        isHasService: false,
        serviceValue: {},
        formValue: {},
        fileLampiran: [],
        totalServiceSubmission: 0
    }
}
export const mutations = {
    setUserLogin(state, UserLogin) {
        state.UserLogin = UserLogin
    },
    setIsLogin(state, IsLogin) {
        state.IsLogin = IsLogin
    },
    setIsRole(state, IsRole) {
        state.IsRole = IsRole
    },
    setHistoryUrl(state, HistoryUrl) {
        state.HistoryUrl = HistoryUrl
    },
    setProductId(state, product_id) {
        state.product_id = product_id
    },
    setProductTypeSlug(state, product_type_slug) {
        state.product_type_slug = product_type_slug
    },
    setProductTestType(state, product_test_type) {
        state.product_test_type = product_test_type
    },
    setIsChangeForm(state, IsChangeForm) {
        state.IsChangeForm = IsChangeForm
    },
    setIsHideLiveChat(state, IsHideLiveChat) {
        state.IsHideLiveChat = IsHideLiveChat
    },

    setBreadcrumb(state, breadcrumb) {
        state.breadcrumb = breadcrumb
    },

    setIsDraft(state, isDraft) {
        state.isDraft = isDraft
    },
    setIsHasService(state, isHasService) {
        state.isHasService = isHasService
    },
    setServiceValue(state, serviceValue) {
        state.serviceValue = serviceValue
    },
    setFormValue(state, formValue) {
        state.formValue = formValue
    },
    setFileLampiran(state, fileLampiran) {
        state.fileLampiran = fileLampiran
    },

    setTotalServiceSubmission(state, totalServiceSubmission) {
        state.totalServiceSubmission = totalServiceSubmission
    }
}
export const getters = {
    getRole: (state) => {
        return state.UserLogin ? state.UserLogin.role.role_name : '';
    }
}
export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let UserLogin = null;
        let IsLogin = false;
        let IsRole = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                UserLogin = JSON.parse(parsed.UserLogin)
                IsLogin = JSON.parse(parsed.IsLogin)
                IsRole = JSON.parse(parsed.IsRole)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUserLogin', UserLogin)
        commit('setIsLogin', IsLogin)
        commit('setIsRole', IsRole)
    }
}
