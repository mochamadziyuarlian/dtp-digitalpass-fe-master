import AK from "../portal/TahapanPengajuan/AK.vue";

describe('AK.vue', () => {
    it('renders props.msg ketika dilempar', () => {
        expect(AK.props).toMatchObject({
            Data: {
                product_name: null,
                product_description: null
            }
          });
    });
});
