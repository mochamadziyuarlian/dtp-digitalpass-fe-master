import Vue from 'vue';

Vue.mixin({
  methods: {
    swal(type, text) {
      if (type === 'success') {
        const swal = this.$swal({
          icon: 'success',
          title: 'Berhasil',
          text: text,
        });
        return swal;
      } else if (type === 'error') {
        const swal = this.$swal({
          icon: 'error',
          title: 'Gagal',
          text: text,
        });
        return swal;
      } else if (type === 'confirm-add') {
        const swal = this.$swal({
          icon: 'warning',
          title: 'Konfirmasi Simpan Konten',
          text: text,
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak'
        });
        return swal;
      } else if (type === 'confirm-edit') {
        const swal = this.$swal({
          icon: 'warning',
          title: 'Konfirmasi Edit Konten',
          text: text,
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak'
        });
        return swal;
      } else if (type === 'confirm-remove') {
        const swal = this.$swal({
          icon: 'warning',
          title: 'Konfirmasi Hapus Konten',
          text: text,
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak'
        });
        return swal;
      } else if (type === 'confirm-pengajuan') {
        const swal = this.$swal({
          icon: 'warning',
          title: 'Apakah anda yakin?',
          text: text,
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak'
        });
        return swal;
      } else if (type === 'confirm-pengguna') {
        const swal = this.$swal({
          icon: 'warning',
          title: 'Konfirmasi Hapus Pengguna',
          text: text,
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak'
        });
        return swal;
      } else {

      }
    }
  }
})
