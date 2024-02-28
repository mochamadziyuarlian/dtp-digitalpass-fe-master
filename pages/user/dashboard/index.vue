<template>
    <div>
        <div class="section-container">
            <div class="ongoing-badge" v-if="ongoingRequest > 0">
                <div class="row align-items-center">
                    <div class="col-xl-10 d-flex align-items-center">
                        <div class="d-flex align-items-center">
                            <img src="/v3/Portal/assets/images/dashboard/request-ongoing.svg" />
                            <p class="counter">{{ ongoingRequest }}</p>
                        </div>
                        <div class="badge-text">
                            <p>
                                Pengajuan layanan Anda
                            </p>
                            <p>
                                <b>sedang berjalan</b>
                            </p>
                        </div>
                    </div>
                    <div class="col-xl-2 d-flex justify-content-end">
                        <nuxt-link to="/user/dashboard/pengajuan-berlangsung" type="button" class="btn btn-detail">
                            Lihat Detail
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12">
                    <div class="banner">
                        <div class="card">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <img src="/v3/Portal/assets/icon/ICON_DASHBOARD_BANNER.svg">
                                    </div>
                                    <div v-if="totalServiceSubmission > 0" class="col-xl-8">
                                        <p class="title">
                                            Yuk, ajukan layanan lagi!
                                        </p>
                                        <span class="desc">
                                            <p class="mb-0">
                                                Selamat Datang di Digitalpass, {{ Data.user.name }}✋
                                            </p>
                                            <p class="mb-0">
                                                Layananmu sebelumnya sudah selesai diproses. Tertarik ajukan layanan lagi?
                                            </p>
                                            <p class="mb-0">
                                                Cukup dengan klik tombol
                                                <span style="font-weight: 700; color: #E42313;">
                                                    ajukan layanan
                                                </span>
                                                di sebelah kanan!
                                            </p>
                                        </span>
                                    </div>
                                    <div v-else class="col-xl-8">
                                        <p class="title">
                                            Ajukan Layanan Pertamamu!
                                        </p>
                                        <span class="desc">
                                            <p class="mb-0">
                                                Selamat Datang di Digitalpass, {{ Data.user.name }}✋
                                            </p>
                                            <p class="mb-0">
                                                Ajukan layanan pertama untuk pantau dan monitor statistik produk mu.
                                            </p>
                                            <p class="mb-0">
                                                Cukup dengan klik tombol
                                                <span style="font-weight: 700; color: #E42313;">
                                                    ajukan layanan
                                                </span>
                                                di sebelah kanan!
                                            </p>
                                        </span>
                                    </div>
                                    <div class="col d-flex justify-content-end">
                                        <nuxt-link to="/user/monitoring/pengajuan-layanan/pengajuan" type="button"
                                            class="btn btn-v3-dsa-primary btn-banner">
                                            <img src="/v3/Portal/assets/icon/ICON_ADD.svg" style="margin-right: 4px;">
                                            Ajukan Layanan
                                        </nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="antrian-kerja">
                        <label class="label-title"> Antrian Kerja DOA</label>
                        <div class="list-layanan">
                            <div class="row">
                                <div class="col-xl-4">
                                    <div class="title">Estimasi Pengerjaan Layanan</div>
                                    <div class="estimasi-layanan">
                                        <div class="title">Heuristic Evaluation</div>
                                        <div class="row">
                                            <div class="col-xl-4" v-for="(item, index) of DataHE" :key="index" :card="index"
                                                style="margin-bottom: 16px;">
                                                <div class="row">
                                                    <div class="col-auto pr-0">
                                                        <p class="count">
                                                            {{ item.work }}
                                                        </p>
                                                    </div>
                                                    <div class="col d-flex align-items-center" style="padding-left: 4px;">
                                                        <div class="borders" :style="`border: 2px ${item.color} solid`">
                                                            <p class="type-he" :style="`color: ${item.color}`">{{ item.type
                                                            }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label class="desc">
                                                    {{ item.desc }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xl-6" v-for="(item, index) of DataEstimasiLayanan" :key="index"
                                                :style="`margin-bottom: ${index > 2 ? '0' : '16px'}`" :card="index">
                                                <div class="title">
                                                    {{ item.title }}
                                                </div>
                                                <div class="row">
                                                    <div class="col-auto pr-0">
                                                        <p class="count">
                                                            {{ item.work }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <label class="desc">
                                                    {{ item.desc }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="col-xl-12" style="margin-bottom: 16px">
                                        <div class="calendar">
                                            <label class="title">Heatmap Kalender</label>
                                            <div style="margin-top: 24px" class="calendar-line">
                                                <client-only>
                                                    <v-calendar transparent borderless class="border-0 v-calendar"
                                                        :attributes="attributes" title-position="left" locale="id"
                                                        :min-date="Data.minDateCalendar" @dayclick="onChangeCalendar"
                                                        @update:from-page="onChangeCalendarPage" />
                                                    <div class="desc-headmap row">
                                                        <div class="col-auto">
                                                            <div class="row">
                                                                <div class="circle"></div>
                                                                <p>High</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="row">
                                                                <div class="circle" style="background: #FFA07A;"></div>
                                                                <p>Medium</p>
                                                            </div>
                                                        </div>
                                                        <div class="col-auto">
                                                            <div class="row">
                                                                <div class="circle" style="background: #FFDFA6;"></div>
                                                                <p>Low</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="color: #2E3032;font-weight: 600;margin: 0 0 18px 16px;">
                                                        <p><b>Suggestion</b><br>Disarankan untuk melakukan
                                                            pengajuan pada
                                                            minggu
                                                            dengan status
                                                            low dan medium.</p>
                                                    </div>
                                                </client-only>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4">
                                    <div class="col-xl-12">
                                        <div class="detail-kegiatan">
                                            <label class="title">Summary</label>
                                            <div class="desc"
                                                style="font-size: 12px;line-height: 18px; font-family: Nunito Sans; ">
                                                Pilih layanan
                                                untuk mengaktifkan
                                                filter </div>
                                            <div class="row" style="margin: 8px 70px 16px 6px;">
                                                <button type="button" class="jumlah-layanan col-auto btn btn-v3-dsa-primary"
                                                    v-for="(item, index) of Summary.dataSummary" :key="index"
                                                    :style="`margin-bottom: ${index > 2 ? '0' : '8px'}`" :card="index"
                                                    @click="handleButtonClick(index)"
                                                    :class="{ 'tombol-merah': activeButtons[index] }">

                                                    <span class="detail-jumlah-layanan">

                                                        {{ item.service_name }}
                                                    </span>
                                                    <span class="detail-jumlah-layanan">|</span>
                                                    <span class="detail-jumlah-layanan">
                                                        {{ item.count }}
                                                    </span>
                                                </button>
                                            </div>

                                            <label class="title">Detail Kegiatan</label>
                                            <div class="scroll-max">
                                                <div class="list-kegiatan" v-for="(item, index) of Data.listDetailKegiatan"
                                                    :key="index">
                                                    <span class="line"></span>
                                                    <div class="row">
                                                        <div class="col-xl-12">
                                                            <div class="card">
                                                                <div class="card-body">
                                                                    <p class="title">
                                                                        {{ item.service_type }} {{ item.product_name }}
                                                                    </p>
                                                                    <div class="desc">
                                                                        <span
                                                                            v-if="item.service_type !== 'Service Operation'">
                                                                            {{ item.start_date |
                                                                                formatDateDetailKegiatan('start') }}
                                                                        </span>
                                                                        <span v-else>
                                                                            {{ item.start_date |
                                                                                formatDateDetailKegiatan('end') }}
                                                                        </span>


                                                                        <span
                                                                            v-if="item.service_type !== 'Service Operation'">
                                                                            - {{ item.end_date |
                                                                                formatDateDetailKegiatan('end') }}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="null-data" v-if="Data.listDetailKegiatan.length === 0">
                                                    <img
                                                        src="/v3/Portal/assets/icon/DASHBOARD_DETAIL_KEGIATAN_NO_DATA_NEW.svg">
                                                    <p class="label">
                                                        Tidak ada jadwal
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="periode">
                        <div class="row">
                            <div class="col-auto align-self-center">
                                <label class="label-title">Pilih Periode</label>
                            </div>
                            <div class="col">
                                <div class="filter-select"
                                    @click="IsShowFilter.Calendar.isOpen = !IsShowFilter.Calendar.isOpen">
                                    <div class="row d-flex align-items-center">
                                        <div class="col-auto">
                                            <img src="/v3/Portal/assets/icon/DASHBOARD_PILIH_PERIODE_CALENDAR.svg">
                                        </div>
                                        <div class="col-auto pl-0 pr-2">
                                            <div class="filter-label">
                                                <span
                                                    v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label !== 'year' && !IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen">
                                                    {{ IsShowFilter.Calendar.additional.selectedMonth.selected.label + ' ' +
                                                        IsShowFilter.Calendar.additional.selectedYear.selected.label }}
                                                </span>
                                                <span
                                                    v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'year' && !IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen">
                                                    {{ IsShowFilter.Calendar.additional.selectedMonth.selected.label }}
                                                </span>
                                                <span v-if="IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen">
                                                    Semua Periode
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col pl-0 pr-1 d-flex justify-content-end">
                                            <span class="filter-select-icon">
                                                <img src="/v3/Portal/assets/icon/DASHBOARD_PILIH_PERIODE_DOWN.svg">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="filter-select-list" v-if="IsShowFilter.Calendar.isOpen">
                                    <div class="filter-select-period">
                                        <div class="row d-flex justify-content-center">
                                            <div class="col-auto">
                                                <div class="filter-select-period-list" @click="onChangePeriode('month')"
                                                    :class="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'month' ? 'selected' : ''">
                                                    <label>Bulan</label>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div class="filter-select-period-list" @click="onChangePeriode('triwulan')"
                                                    :class="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'triwulan' ? 'selected' : ''">
                                                    <label>Triwulan</label>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <div class="filter-select-period-list" @click="onChangePeriode('year')"
                                                    :class="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'year' ? 'selected' : ''">
                                                    <label>Tahun</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="filter-select-date-selected">
                                        <div class="row d-flex justify-content-center">
                                            <div class="col-auto pr-1">
                                                <label class="filter-select-date-selected-month"
                                                    @click="IsShowFilter.Calendar.additional.selectedMonth.isOpen = true; IsShowFilter.Calendar.additional.selectedYear.isOpen = false;">
                                                    {{ IsShowFilter.Calendar.additional.selectedMonth.selected.label }}
                                                </label>
                                            </div>
                                            <div class="col-auto pl-1 pr-1">
                                                <label class="filter-select-date-selected-year"
                                                    v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label !== 'year'"
                                                    @click="IsShowFilter.Calendar.additional.selectedYear.isOpen = true; IsShowFilter.Calendar.additional.selectedMonth.isOpen = false;">
                                                    {{ IsShowFilter.Calendar.additional.selectedYear.selected.label }}
                                                </label>
                                            </div>
                                            <div class="col-auto pl-1"
                                                v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'triwulan' && IsShowFilter.Calendar.additional.selectedMonth.isOpen === true">
                                                <div style="margin-top: 1px;">
                                                    <img src="/v3/Portal/assets/icon/DASHBOARD_PILIH_PERIODE_TRIWULAN_INFO.svg"
                                                        id="tooltip-triwulan" />
                                                </div>
                                                <b-tooltip target="tooltip-triwulan" triggers="hover" placement="down"
                                                    class="tooltip-periode">
                                                    <label class="mb-0">
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedMonth.selected.label === 'Triwulan 1'">
                                                            Januari - Maret
                                                        </span>
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedMonth.selected.label === 'Triwulan 2'">
                                                            April - Juni
                                                        </span>
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedMonth.selected.label === 'Triwulan 3'">
                                                            Juli - September
                                                        </span>
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedMonth.selected.label === 'Triwulan 4'">
                                                            Oktober - Desember
                                                        </span>
                                                    </label>
                                                </b-tooltip>
                                            </div>
                                        </div>
                                        <div class="row text-center" style="margin-top: 4px;">
                                            <div class="col-xl-12">
                                                <label class="filter-select-date-selected-choose">
                                                    Pilih
                                                    <span
                                                        v-if="!IsShowFilter.Calendar.additional.selectedYear.isOpen && IsShowFilter.Calendar.additional.selectedMonth.isOpen">
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'month'">
                                                            bulan
                                                        </span>
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'year'">
                                                            tahun
                                                        </span>
                                                        <span
                                                            v-if="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'triwulan'">
                                                            triwulan
                                                        </span>
                                                    </span>
                                                    <span
                                                        v-if="IsShowFilter.Calendar.additional.selectedYear.isOpen && !IsShowFilter.Calendar.additional.selectedMonth.isOpen">
                                                        <span>
                                                            tahun
                                                        </span>
                                                    </span>
                                                    disini
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="filter-select-list-month"
                                        v-if="IsShowFilter.Calendar.additional.selectedMonth.isOpen">
                                        <div class="row text-center">
                                            <div :class="IsShowFilter.Calendar.additional.selectedPeriod.selected.label === 'month' ? 'col-xl-4' : 'not-month col-xl-6'"
                                                v-for="(item, index) of Data.listMonth" :key="index">
                                                <div class="filter-select-list-month-list" @click="onSelectMonth(item)">
                                                    <label
                                                        :class="IsShowFilter.Calendar.additional.selectedMonth.selected.label === item.label && !IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen ? 'selected' : ''">
                                                        {{ item.label }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="filter-select-list-year"
                                        v-if="IsShowFilter.Calendar.additional.selectedYear.isOpen">
                                        <div class="row text-center">
                                            <div class="col-xl-12" v-for="(item, index) of Data.listYear" :key="index">
                                                <div class="filter-select-list-year-list" @click="onSelectYear(item)">
                                                    <label
                                                        :class="IsShowFilter.Calendar.additional.selectedYear.selected.label === item.label ? 'selected' : ''">
                                                        {{ item.label }}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="filter-select-all-period">
                                        <div class="row">
                                            <div class="col-xl-12"
                                                v-if="!IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen">
                                                <button type="button" class="btn btn-v3-dsa-primary"
                                                    @click="onChangeSeluruhPeriode(true)">
                                                    Pilih seluruh periode
                                                </button>
                                            </div>
                                            <div class="col-xl-12"
                                                v-if="IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen">
                                                <button type="button" class="btn btn-v3-dsa-secondary batalkan"
                                                    @click="onChangeSeluruhPeriode(false)">
                                                    <img src="/v3/Portal/assets/icon/DASHBOARD_PILIH_PERIODE_BAN.svg" />
                                                    Batalkan seluruh periode
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-12">
                    <div class="pengajuan-layanan">
                        <label class="label-title">Pengajuan Layanan</label>
                        <div class="list-layanan">
                            <div class="row">
                                <div class="col-xl-4 item-layanan" v-for="(item, index) of Data.listPengajuanLayanan"
                                    :key="index" :style="`margin-bottom: ${index > 2 ? '0' : '16px'}`" :card="index">
                                    <div style="margin-left: 32px;">
                                        <p class="title">
                                            {{ item.title }}
                                        </p>
                                        <div>
                                            <div class="row">
                                                <div class="col-auto pr-0">Pengajuan Layanan
                                                    <p class="count">
                                                        {{ item.countThisMonth }}
                                                    </p>
                                                </div>
                                                <div v-if="!IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen"
                                                    class="col d-flex align-items-center" style="padding-left: 4px;">
                                                    <span class="badge-percentage up"
                                                        v-if="item.countThisMonth > item.countLastMonth">
                                                        +{{ item.countThisMonth - item.countLastMonth }}
                                                        <img src="/v3/Portal/assets/icon/ICON_DASHBOARD_PENGAJUAN_LAYANAN_UP.svg"
                                                            style="margin-bottom: 3px;" />
                                                    </span>
                                                    <span class="badge-percentage down"
                                                        v-if="item.countThisMonth < item.countLastMonth">
                                                        {{ item.countThisMonth - item.countLastMonth }}
                                                        <img src="/v3/Portal/assets/icon/ICON_DASHBOARD_PENGAJUAN_LAYANAN_DOWN.svg"
                                                            style="margin-bottom: 3px;" />
                                                    </span>
                                                </div>
                                            </div>
                                            <label class="desc">
                                                {{ item.desc }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="jumlah-per-tahapan">
                                <label class="label-title">Jumlah Per Tahapan</label>
                                <div style="margin-top: 16px">
                                    <ChartJumlahPerTahapan :Graph="Data.listJumlahPerTahapan" id="ChartJumlahPerTahapan">
                                    </ChartJumlahPerTahapan>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <div class="daftar-pengajuan-layanan">
                                <label class="label-title">Daftar Pengajuan Layanan</label>
                                <div class="search">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <img src="/v3/Portal/assets/icon/ICON_SEARCH.svg">
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Cari produk"
                                            v-model="Filter.search" />
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            <th id="left">Produk</th>
                                                            <th>Nama Layanan</th>
                                                            <th>Tahapan</th>
                                                            <th>Progress</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) of Data.listDaftarPengajuanLayanan.content"
                                                            :key="index">
                                                            <td id="left" class="align-middle">
                                                                <div class="row align-items-center">
                                                                    <div class="col-auto pr-0 align-self-center">
                                                                        <img
                                                                            :src="item.product_name | filterProductImage" />
                                                                    </div>
                                                                    <div class="col pl-0 align-self-center">
                                                                        <p class="product-text">
                                                                            {{ item.product_name || '-' }}
                                                                        </p>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-middle">
                                                                <div class="row">
                                                                    <div class="col align-self-center">
                                                                        <span v-if="item.service !== null">
                                                                            {{ item.service.name || '-' }}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="align-middle">{{ item.status | filterTahapan }}</td>
                                                            <td class="align-middle">
                                                                <p>
                                                                    <span>{{ item.status | filterProgress('progress')
                                                                    }}</span>
                                                                </p>
                                                                <div class="progress">
                                                                    <div class="progress-bar" role="progressbar"
                                                                        :style="item.status | filterProgress('width')"
                                                                        aria-valuenow="25" aria-valuemin="0"
                                                                        aria-valuemax="100">
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <tbody>
                                                        <tr v-if="Data.listDaftarPengajuanLayanan.content.length === 0"
                                                            class="text-center">
                                                            <td colspan="4">
                                                                <div class="null-data">
                                                                    <img
                                                                        src="/v3/Portal/assets/icon/DASHBOARD_DAFTAR_PENGAJUAN_LAYANAN_NO_DATA.svg">
                                                                    <p class="label">
                                                                        Produk tidak ditemukan
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row pagination" v-if="Data.listDaftarPengajuanLayanan.content.length !== 0">
                                        <div class="col-xl-6">
                                            <div class="row d-flex align-items-center">
                                                <div class="col-auto">
                                                    <span class="pagination-label">
                                                        Menampilkan
                                                    </span>
                                                </div>
                                                <div class="col-auto px-0">
                                                    <select class="form-control pagination-page-size"
                                                        v-model="Pagination.pageSize">
                                                        <option>5</option>
                                                        <option>10</option>
                                                        <option>50</option>
                                                        <option>100</option>
                                                    </select>
                                                </div>
                                                <div class="col">
                                                    <span class="pagination-label">
                                                        dari
                                                    </span>
                                                    <span class="pagination-label" style="font-weight: 600;">
                                                        {{ Data.listDaftarPengajuanLayanan.meta.totalData }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 d-flex align-self-center justify-content-end">
                                            <b-pagination class="font-size-12" v-model="Pagination.pageIndex"
                                                :total-rows="Data.listDaftarPengajuanLayanan.meta.totalData"
                                                :per-page="Pagination.pageSize" first-number last-number limit="2">
                                            </b-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/plugins/mixins.js'
import moment from 'moment'
import {
    TODAY,
    FIRST_DAY_OF_THIS_MONTH,
    LAST_DAY_OF_THIS_MONTH,
    THIS_MONTH,
    THIS_YEAR,
    LIST_MONTH,
    LIST_TRIWULAN,
    LIST_YEAR,
    THIS_MONTH_OF_HEADMAP
} from '@/static/v3/Portal/utils/helper'
import ChartJumlahPerTahapan from '@/components/v3/Portal/Shared/Dashboard/ChartJumlahPerTahapan'

export default {
    layout: 'v3/Portal/default',
    mixins: [mixins],
    components: {
        'ChartJumlahPerTahapan': ChartJumlahPerTahapan
    },
    data() {
        return {
            Data: {
                listPengajuanLayanan: [],
                listPengajuanLayananThisMonth: [],
                listPengajuanLayananLastMonth: [],
                listJumlahPerTahapan: null,
                listDetailKegiatan: [],
                listDaftarPengajuanLayanan: {
                    content: [],
                    meta: {}
                },
                listMonth: [],
                listYear: [],
                user: {},
                minDateCalendar: moment("01 November 2019").format()
            },
            Pagination: {
                pageSize: 5,
                pageIndex: 1
            },
            Filter: {
                search: null,
                date_start: FIRST_DAY_OF_THIS_MONTH,
                date_end: LAST_DAY_OF_THIS_MONTH,
                date_start_last_month: null,
                date_end_last_month: null,
            },

            IsShowFilter: {
                Calendar: {
                    isOpen: false,
                    selected: {
                        label: 'Pilih Tanggal',
                        value: null
                    },
                    additional: {
                        selectedPeriod: {
                            selected: {
                                label: 'month'
                            }
                        },
                        selectedYear: {
                            isOpen: false,
                            selected: {
                                label: '',
                                value: ''
                            }
                        },
                        selectedMonth: {
                            isOpen: true,
                            selected: {
                                label: '',
                                value: ''
                            }
                        },
                        selectedAllPeriod: {
                            isOpen: false,
                        },
                    }
                }
            },
            Additional: {
                labelCardPengajuanLayanan: {
                    all: 'Total pengajuan bulan ini',
                    card: 'Jumlah bulan ini',
                }
            }, DataHE: [{
                work: '7',
                color: '#FFB020',
                type: 'Simple',
                desc: 'Hari Kerja'
            }, {
                work: '10',
                type: 'Medium',
                color: '#FF6121',
                desc: 'Hari Kerja'
            }, {
                work: '15',
                type: 'Complex',
                color: '#C40D0E',
                desc: 'Hari Kerja'
            },
            ],
            DataEstimasiLayanan: [{
                title: 'Usability Testing',
                work: '15',
                desc: 'Hari Kerja'
            }, {
                title: 'Software Testing',
                work: '5',
                desc: 'Hari Kerja'
            }, {
                title: 'Security Testing',
                work: '5',
                desc: 'Hari Kerja'
            },
            ],
            Summary: {
                dataSummary: []
            },
            filterData: [{
                name: "heuristic-evaluation",
            }, {
                name: 'alih-kelola'
            }, {
                name: 'security-testing'
            }, {
                name: 'software-testing'
            }, {
                name: 'usability-testing'
            }
            ], dataParams: {
                day: TODAY,
                month: null,
                year: null
            },
            filterSummary: null,
            headmap: [],
            attributes: [],
            events: [],
            activeButtons: [],
            ongoingRequest: 0
        }
    },
    filters: {
        formatDateDetailKegiatan(value, type) {
            if (value !== null) {
                if (type === 'start') {
                    return moment(String(value)).format('DD MMMM')
                }
                if (type === 'end') {
                    return moment(String(value)).format('DD MMMM YYYY')
                }
            }
        },
        filterTahapan(value) {
            if (value === '3') {
                return 'Mengajukan Layanan'
            } else if (value === '4') {
                return 'Verifikasi Data Pengajuan'
            } else if (value === '5') {
                return 'Penetapan Jadwal Pemaparan'
            } else if (value === '6') {
                return 'Pengujian Sedang Berlangsung'
            } else {
                return 'Pengujian Selesai'
            }
        },
        filterProgress(value, type) {
            let status3 = '20%'
            let status4 = '40%'
            let status5 = '60%'
            let status6 = '80%'
            let status7 = '100%'

            if (value === '3') {
                if (type === 'progress') {
                    return status3
                } else {
                    return `width: ${status3}`
                }
            } else if (value === '4') {
                if (type === 'progress') {
                    return status4
                } else {
                    return `width: ${status4}`
                }
            } else if (value === '5') {
                if (type === 'progress') {
                    return status5
                } else {
                    return `width: ${status5}`
                }
            } else if (value === '6') {
                if (type === 'progress') {
                    return status6
                } else {
                    return `width: ${status6}`
                }
            } else {
                if (type === 'progress') {
                    return status7
                } else {
                    return `width: ${status7}`
                }
            }
        },
        filterProductImage(value) {
            let product = '';
            let path = '/v3/Portal/assets/images/products';
            if (value) {
                product = value.toLowerCase().replace(/\s/g, '')
            }

            if (product === 'agree') {
                return path + '/Agree.png'
            } else if (product === 'agreemart') {
                return path + '/AgreeMart.png'
            } else if (product === 'bigbox') {
                return path + '/BigBox.png'
            } else if (product === 'gameqoo') {
                return path + '/Gameqoo.png'
            } else if (product === 'indihomesmart') {
                return path + '/IndiHomeSmart.png'
            } else if (product === 'iotconnectivity') {
                return path + '/IoTConnectivity.png'
            } else if (product === 'iotplatform') {
                return path + '/IoTPlatform.png'
            } else if (product === 'logeedistribution') {
                return path + '/LogeeDistribution.png'
            } else if (product === 'logeeport') {
                return path + '/LogeePort.png'
            } else if (product === 'logeetruck') {
                return path + '/LogeeTruk.png'
            } else if (product === 'mypetamina') {
                return path + '/MyPetamina.png'
            } else if (product === 'netmonk') {
                return path + '/NetMonk.png'
            } else if (product === 'oca') {
                return path + '/OCA.png'
            } else if (product === 'padiumkm') {
                return path + '/PadiUMKM.png'
            } else if (product === 'PeduliLindungi') {
                return path + '/pedulilindungi.png'
            } else if (product === 'pijarbelajar') {
                return path + '/PijarBelajar.png'
            } else if (product === 'pijarmahir') {
                return path + '/PijarMahir.png'
            } else if (product === 'sooltanpay') {
                return path + '/Sooltanpay.png'
            } else if (product === 'sprinthink') {
                return path + '/Sprinthink.png'
            } else if (product === 'tomps') {
                return path + '/TOMPS.png'
            } else {
                return path + '/default.svg'
            }
        }
    },
    computed: {
        totalServiceSubmission() {
            return this.$store.state.totalServiceSubmission
        },
    },
    watch: {
        'Pagination.pageIndex'() {
            this.fetchGetDaftarPengajuanLayanan()
        },
        'Pagination.pageSize'() {
            this.fetchGetDaftarPengajuanLayanan()
        },
        'Filter.search'() {
            this.Pagination.pageIndex = 1

            if (this.Filter.search === '') {
                this.Filter.date_start = FIRST_DAY_OF_THIS_MONTH
                this.Filter.date_end = LAST_DAY_OF_THIS_MONTH
            } else {
                this.Filter.date_start = null
                this.Filter.date_end = null
            }
            this.fetchGetDaftarPengajuanLayanan()
        },
        'IsShowFilter.Calendar.additional.selectedMonth.selected.label'() {
            this.handleConvertDatePeriod()
        },
        'IsShowFilter.Calendar.additional.selectedYear.selected.label'() {
            this.handleConvertDatePeriod()
        },
    },
    created() {
        this.$store.commit('setBreadcrumb', [{
            title: 'Dashboard',
            titleURL: null,
            menu: []
        }]);

        this.Data.user = this.UserLogin()
    },
    mounted() {
        this.getOngoingRequest()

        this.IsShowFilter.Calendar.additional.selectedMonth.selected.label = THIS_MONTH
        this.IsShowFilter.Calendar.additional.selectedYear.selected.label = THIS_YEAR
        this.IsShowFilter.Calendar.additional.selectedYear.selected.value = THIS_YEAR
        this.Data.listMonth = LIST_MONTH
        this.Data.listYear = LIST_YEAR

        this.Filter.date_start = FIRST_DAY_OF_THIS_MONTH
        this.Filter.date_end = LAST_DAY_OF_THIS_MONTH

        let params = {
            selected_date: TODAY
        }
        this.fetchGetDetailKegiatan(params)
        this.fetchGetPengajuanLayanan()

        this.fetchGetDaftarPengajuanLayanan()
        this.fetchGetJumlahPerTahapan()
        // this.getFirstValueEvent();
        let months = {
            year: THIS_YEAR,
            month: THIS_MONTH_OF_HEADMAP
        }
        this.fetchGetHeadmap(months)
        this.fetchGetSummary(months)
    },
    methods: {
        async helperFetchGetAllPengajuan(params, callback) {
            await this.Request('GET', '/api/v3/requests', params, null, 'BASIC', (res) => {
                callback(res)
            })
        },
        async fetchGetDaftarPengajuanLayanan() {
            // Notes
            // Status 3 = Mengajukan Layanan (20%)
            // Status 4 = Verifikasi Data Pengajuan (40%)
            // Status 5 = Penetapan Jadwal Pemaparan (60%)
            // Status 6 = Pengujian Sedang Berlangsung (80%)
            // Status 7 = Pengujian Selesai (100%)

            this.Data.listDaftarPengajuanLayanan = {
                content: [],
                meta: {}
            }

            let params = {
                page: this.Pagination.pageIndex,
                size: this.Pagination.pageSize,
                search_key: this.Filter.search,
                // is_draft: 'false',
                status: 'SUBMIT_DATA_PENGAJUAN,VERIFIKASI_DATA_PENGAJUAN,JADWAL_PEMAPARAN,PROSES_PENGUJIAN,LAPORAN_PENGUJIAN',
                date_start: this.Filter.date_start,
                date_end: this.Filter.date_end,
            }

            this.helperFetchGetAllPengajuan(params, (res) => {
                if (res.code === 200) {
                    this.Data.listDaftarPengajuanLayanan = res
                }
            })
        },

        async fetchGetJumlahPerTahapan() {
            // Notes
            // Status 3 = Mengajukan Layanan
            // Status 4 = Verifikasi Data Pengajuan
            // Status 5 = Jadwal Pemaparan
            // Status 6 = Proses Pengujian
            // Status 7 = Selesai

            let params = {
                // is_draft: 'false',
                status: 'SUBMIT_DATA_PENGAJUAN,VERIFIKASI_DATA_PENGAJUAN,JADWAL_PEMAPARAN,PROSES_PENGUJIAN,LAPORAN_PENGUJIAN',
                date_start: this.Filter.date_start,
                date_end: this.Filter.date_end,
            }

            this.helperFetchGetAllPengajuan(params, (res) => {
                const longLabel = [
                    'Langkah 1*Mengajukan*Layanan',
                    'Langkah 2*Verifikasi Data*Pengajuan',
                    'Langkah 3*Penetapan Jadwal*Pemaparan',
                    'Langkah 4*Pengujian Sedang*Berlangsung', 'Langkah 5*Pengujian Selesai'
                ]
                const adjustLabel = longLabel.map(label => label.split('*'))

                if (res.code === 200) {
                    let findProgress1 = res.content.filter(x => x.statusName === 'SUBMIT_DATA_PENGAJUAN').length
                    let findProgress2 = res.content.filter(x => x.statusName === 'VERIFIKASI_DATA_PENGAJUAN').length
                    let findProgress3 = res.content.filter(x => x.statusName === 'JADWAL_PEMAPARAN').length
                    let findProgress4 = res.content.filter(x => x.statusName === 'PROSES_PENGUJIAN').length
                    let findProgress5 = res.content.filter(x => x.statusName === 'LAPORAN_PENGUJIAN').length

                    this.Data.listJumlahPerTahapan = {
                        labels: adjustLabel,
                        datasets: [{
                            data: [
                                findProgress1 > 0 ? findProgress1 : 0,
                                findProgress2 > 0 ? findProgress2 : 0,
                                findProgress3 > 0 ? findProgress3 : 0,
                                findProgress4 > 0 ? findProgress4 : 0,
                                findProgress5 > 0 ? findProgress5 : 0,
                            ],
                            fill: false,
                            borderColor: '#EEAFAF',
                            backgroundColor: '#EEAFAF',
                            tension: 0.1
                        }]
                    }
                } else {
                    this.Data.listJumlahPerTahapan = {
                        labels: adjustLabel,
                        datasets: [{
                            data: [],
                            fill: false,
                            borderColor: '#EEAFAF',
                            backgroundColor: '#EEAFAF',
                            tension: 0.1
                        }]
                    }
                }
            })
        },
        async fetchGetDetailKegiatan(params) {
            await this.Request('GET', '/api/v3/dashboard/request-by-selected-date', params, null, 'BEARER', async (res) => {
                if (res.code === 200) {
                    this.Data.listDetailKegiatan = res.content;

                    const serviceTypeMappings = {
                        "heuristic-evaluation": "Heuristic Evaluation (HE)",
                        "software-testing": "Software Testing",
                        "security-testing": "Security Testing",
                        "alih-kelola": "Service Operation",
                        "usability-testing": "Usability Testing (UT)"
                    };

                    this.Data.listDetailKegiatan = this.Data.listDetailKegiatan.map(item => {
                        if (serviceTypeMappings.hasOwnProperty(item.service_type)) {
                            item.service_type = serviceTypeMappings[item.service_type];
                        }
                        return item;
                    });
                }
            });
        },
        async fetchGetSummary(params) {
            await this.Request('GET', '/api/v3/dashboard/service-summary-by-month', params, null, 'BEARER', (res) => {
                if (res.code === 200) {
                    const data = res.content;

                    const serviceNameMappings = {
                        "heuristic-evaluation": "HE",
                        "software-testing": "SOT",
                        "security-testing": "SET",
                        "alih-kelola": "SEO",
                        "usability-testing": "UT"
                    };

                    const transformedDataMap = {};

                    for (const mappedServiceName of Object.values(serviceNameMappings)) {
                        transformedDataMap[mappedServiceName] = { service_name: mappedServiceName, count: 0 };
                    }

                    for (const item of data) {
                        const mappedServiceName = serviceNameMappings[item.service_type];
                        if (mappedServiceName) {
                            transformedDataMap[mappedServiceName].count = parseInt(item.count) || 0;
                        }
                    }

                    const transformedData = Object.values(transformedDataMap);
                    transformedData.sort((a, b) => a.service_name.localeCompare(b.service_name));
                    this.Summary.dataSummary = transformedData;

                } else {
                    this.HelperErrorCode(callback);
                }
            });
        },
        async fetchGetHeadmap(params) {
            await this.Request('GET', '/api/v3/dashboard/heatmap-calendar', params, null, 'BEARER', async (res) => {
                if (res.code === 200) {
                    this.headmap = res.content;

                    let trafficPerDate = {};

                    this.headmap.forEach(item => {
                        let itemStartDate = new Date(item.start_date);
                        let itemEndDate = new Date(item.end_date);

                        itemStartDate.setHours(itemStartDate.getHours() + 7);
                        itemEndDate.setHours(itemEndDate.getHours() + 7);

                        for (let currentDate = itemStartDate; currentDate <= itemEndDate; currentDate.setDate(currentDate.getDate() + 1)) {
                            let dateKey = new Date(currentDate).toISOString().split('T')[0];

                            if (trafficPerDate[dateKey]) {
                                trafficPerDate[dateKey] += item.traffic;
                            } else {
                                trafficPerDate[dateKey] = item.traffic;
                            }
                        }
                    });

                    let maxTraffic = Math.max(...Object.values(trafficPerDate));

                    this.events = [];
                    this.attributes = [];

                    this.events = Object.keys(trafficPerDate).map(date => ({
                        date,
                        totalTraffic: trafficPerDate[date],
                        trafficLevel: this.getTrafficLevel(trafficPerDate[date], maxTraffic)
                    }));

                    let today = new Date();
                    this.events.forEach(item => {
                        let formattedDate = item.date;
                        let dayOfWeek = moment(formattedDate).day();
                        let highlightBg = item.trafficLevel.class;
                        let highlightColor = item.trafficLevel.contentClass;

                        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                            let obj = {
                                key: item.date,
                                highlight: { class: highlightBg, contentClass: highlightColor },
                                dates: formattedDate
                            };
                            this.attributes.push(obj);
                        }
                    });
                } else {
                    this.HelperErrorCode(callback);
                }
            });
        },
        getTrafficLevel(traffic, maxTraffic) {
            let filterLayanan = this.filterSummary

            if (filterLayanan !== null) {
                if (traffic == 1) {
                    return {
                        class: 'low',
                        contentClass: 'col-black'
                    };
                } else if (traffic == 2) {
                    return {
                        class: 'medium',
                        contentClass: 'col-black'
                    };
                } else {
                    return {
                        class: 'high',
                        contentClass: 'col-white'
                    };
                }
            } else {
                if (maxTraffic >= 1 && maxTraffic <= 4) {
                    return {
                        class: 'low',
                        contentClass: 'col-black'
                    };
                } else if (maxTraffic >= 5 && maxTraffic <= 9) {
                    let percentage = (traffic / maxTraffic) * 100;
                    if (percentage <= 50) {
                        return {
                            class: 'low',
                            contentClass: 'col-black'
                        };
                    } else {
                        return {
                            class: 'medium',
                            contentClass: 'col-black'
                        };
                    }
                } else {
                    let percentage = (traffic / maxTraffic) * 100;
                    if (percentage <= 33) {
                        return {
                            class: 'low',
                            contentClass: 'col-black'
                        };
                    } else if (percentage <= 66) {
                        return {
                            class: 'medium',
                            contentClass: 'col-black'
                        };
                    } else {
                        return {
                            class: 'high',
                            contentClass: 'col-white'
                        };
                    }
                }

            }
        }, handleButtonClick(index) {

            if (this.activeButtons[index]) {
                this.activeButtons[index] = false;
                this.filterSummary = null;

                let params = {
                    selected_date: this.dataParams.day,
                    service: this.filterSummary,
                };
                this.fetchGetDetailKegiatan(params);

                let params2 = {
                    year: this.dataParams.year,
                    month: this.dataParams.month,
                    service: this.filterSummary,
                };
                this.fetchGetHeadmap(params2);

            } else {
                this.activeButtons = [];
                const filterItem = this.filterData[index];
                if (filterItem) {
                    this.filterSummary = filterItem.name;
                }

                this.activeButtons[index] = true;
                let params = {
                    selected_date: this.dataParams.day,
                    service: this.filterSummary,
                };
                this.fetchGetDetailKegiatan(params);

                let params2 = {
                    year: this.dataParams.year,
                    month: this.dataParams.month,
                    service: this.filterSummary,
                };
                this.fetchGetHeadmap(params2);


            }
        },
        onChangeCalendar(day) {
            this.dataParams.day = day.id
            let params = {
                selected_date: day.id,
                service: this.filterSummary
            }
            this.fetchGetDetailKegiatan(params)
        },

        onChangeCalendarPage(page) {
            this.dataParams.month = page.month
            this.dataParams.year = page.year
            let params2 = {
                year: page.year,
                month: page.month,
            }
            let params = {
                year: page.year,
                month: page.month,
                service: this.filterSummary
            }
            this.fetchGetHeadmap(params)
            this.fetchGetSummary(params2)
        },
        onChangePeriode(period) {
            this.IsShowFilter.Calendar.additional.selectedPeriod.selected.label = period
            this.IsShowFilter.Calendar.additional.selectedYear.isOpen = false
            this.IsShowFilter.Calendar.additional.selectedMonth.isOpen = true
            if (period === 'month') {
                this.Data.listMonth = LIST_MONTH
                this.IsShowFilter.Calendar.additional.selectedMonth.selected.label = THIS_MONTH
                this.IsShowFilter.Calendar.additional.selectedMonth.selected.value = FIRST_DAY_OF_THIS_MONTH.split('-')[1]
                this.Additional.labelCardPengajuanLayanan = {
                    all: 'Total pengajuan bulan ini',
                    card: 'Jumlah bulan ini',
                }
            } else if (period === 'year') {
                this.Data.listMonth = LIST_YEAR
                this.IsShowFilter.Calendar.additional.selectedMonth.selected.label = THIS_YEAR
                this.IsShowFilter.Calendar.additional.selectedMonth.selected.value = FIRST_DAY_OF_THIS_MONTH.split('-')[0]
                this.Additional.labelCardPengajuanLayanan = {
                    all: 'Total pengajuan tahun ini',
                    card: 'Jumlah tahun ini',
                }
            } else {
                this.Data.listMonth = LIST_TRIWULAN
                this.IsShowFilter.Calendar.additional.selectedMonth.selected.label = 'Triwulan 1'
                this.IsShowFilter.Calendar.additional.selectedMonth.selected.value = '01,03'
                this.Additional.labelCardPengajuanLayanan = {
                    all: 'Total pengajuan triwulan ini',
                    card: 'Jumlah triwulan ini',
                }
            }
            this.handleLbelCardPengajuanLayanan()
        },
        handleLbelCardPengajuanLayanan() {
            const period = this.IsShowFilter.Calendar.additional.selectedPeriod.selected.label
            const isSelectedAllPeriod = this.IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen

            if (isSelectedAllPeriod) {
                this.Additional.labelCardPengajuanLayanan = {
                    all: 'Total seluruh pengajuan layanan',
                    card: 'Jumlah periode ini',
                }
            } else {
                if (period === 'month') {
                    this.Additional.labelCardPengajuanLayanan = {
                        all: 'Total pengajuan bulan ini',
                        card: 'Jumlah bulan ini',
                    }
                } else if (period === 'year') {
                    this.Additional.labelCardPengajuanLayanan = {
                        all: 'Total pengajuan tahun ini',
                        card: 'Jumlah tahun ini',
                    }
                } else {
                    this.Additional.labelCardPengajuanLayanan = {
                        all: 'Total pengajuan triwulan ini',
                        card: 'Jumlah triwulan ini',
                    }
                }
            }
        },
        endDatePerMonth(month, year) {
            let end_date = '';
            if (month !== '02') {
                if (Number(month) < 8) {
                    if ((Number(month) % 2) > 0) {
                        end_date = '31';
                    } else {
                        end_date = '30';
                    }
                } else {
                    if ((Number(month) % 2) > 0) {
                        end_date = '30';
                    } else {
                        end_date = '31';
                    }
                }
            } else {
                if ((Number(year) % 4) > 0) {
                    end_date = '28';
                } else {
                    end_date = '29';
                }
            }
            return end_date;
        },
        async handleConvertDatePeriod() {
            let getMonth = this.IsShowFilter.Calendar.additional.selectedMonth.selected.value
            let getYear = this.IsShowFilter.Calendar.additional.selectedYear.selected.value
            let getTriwulan = this.IsShowFilter.Calendar.additional.selectedMonth.selected.value
            let getPeriodType = this.IsShowFilter.Calendar.additional.selectedPeriod.selected.label

            if (!this.IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen) {
                if (getPeriodType === 'month') {
                    if (getMonth === '') {
                        getMonth = FIRST_DAY_OF_THIS_MONTH.split('-')[1]
                    }

                    this.Filter.date_start = `${getYear}-${getMonth}-01`

                    let endDateMonth = this.endDatePerMonth(getMonth, getYear);
                    this.Filter.date_end = `${getYear}-${getMonth}-${endDateMonth}`;

                    const DATE = new Date(this.Filter.date_start)
                    const FIRST_DAY_OF_LAST_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth() - 1, 1))).format('YYYY-MM-DD');

                    let endDateLastMonth = this.endDatePerMonth(DATE.getMonth(), DATE.getFullYear());
                    const LAST_DAY_OF_LAST_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth(), 0))).format(`YYYY-MM-${endDateLastMonth}`)

                    this.Filter.date_start_last_month = FIRST_DAY_OF_LAST_MONTH
                    this.Filter.date_end_last_month = LAST_DAY_OF_LAST_MONTH

                } else if (getPeriodType === 'year') {
                    if (getMonth === '') {
                        getMonth = FIRST_DAY_OF_THIS_MONTH.split('-')[0]
                    }

                    this.Filter.date_start = `${getMonth}-01-01`
                    this.Filter.date_end = `${getMonth}-12-31`

                    this.Filter.date_start_last_month = `${getMonth - 1}-01-01`
                    this.Filter.date_end_last_month = `${getMonth - 1}-12-31`

                } else {
                    if (getTriwulan === '') {
                        getTriwulan = '01,03'
                    }

                    this.Filter.date_start = `${getYear}-${getTriwulan.split(',')[0]}-01`

                    let endDateMonth = this.endDatePerMonth(getTriwulan.split(',')[1], getYear);
                    this.Filter.date_end = `${getYear}-${getTriwulan.split(',')[1]}-${endDateMonth}`

                    const sd = new Date(this.Filter.date_start)
                    this.Filter.date_start_last_month = moment(String(new Date(sd.getFullYear(), sd.getMonth() - 3, 1))).format('YYYY-MM-DD')

                    const ed = new Date(this.Filter.date_start_last_month)
                    let endDateLastMonth = this.endDatePerMonth(ed.getMonth() + 3, ed.getFullYear());
                    this.Filter.date_end_last_month = moment(String(new Date(ed.getFullYear(), ed.getMonth() + 3, 0))).format(`YYYY-MM-${endDateLastMonth}`)
                }

                await this.fetchGetPengajuanLayanan()
                await this.fetchGetDaftarPengajuanLayanan()
                await this.fetchGetJumlahPerTahapan()

            }
        },
        async onChangeSeluruhPeriode(isClick) {
            this.IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen = isClick
            this.handleLbelCardPengajuanLayanan()

            if (isClick) {
                this.Filter.date_start = null
                this.Filter.date_end = null
            } else {
                this.Filter.date_start = FIRST_DAY_OF_THIS_MONTH
                this.Filter.date_end = LAST_DAY_OF_THIS_MONTH
            }

            this.IsShowFilter.Calendar.isOpen = false

            await this.fetchGetPengajuanLayanan()
            await this.fetchGetDaftarPengajuanLayanan()
            await this.fetchGetJumlahPerTahapan()
        },
        async fetchGetPengajuanLayanan() {
            this.Data.listPengajuanLayananThisMonth = []
            this.Data.listPengajuanLayananLastMonth = []

            let paramsThisMonth = {
                // is_draft: 'false',
                status: 'SUBMIT_DATA_PENGAJUAN,VERIFIKASI_DATA_PENGAJUAN,JADWAL_PEMAPARAN,PROSES_PENGUJIAN,LAPORAN_PENGUJIAN',
                date_start: this.Filter.date_start,
                date_end: this.Filter.date_end
            }

            await this.helperFetchGetAllPengajuan(paramsThisMonth, (res) => {
                if (res.code === 200) {
                    this.Data.listPengajuanLayananThisMonth = res.content
                } else {
                    this.Data.listPengajuanLayananThisMonth = []
                }
            })

            if (!this.IsShowFilter.Calendar.additional.selectedAllPeriod.isOpen) {
                let paramsLastMonth = {
                    // is_draft: 'false',
                    status: 'SUBMIT_DATA_PENGAJUAN,VERIFIKASI_DATA_PENGAJUAN,JADWAL_PEMAPARAN,PROSES_PENGUJIAN,LAPORAN_PENGUJIAN',
                    date_start: this.Filter.date_start_last_month,
                    date_end: this.Filter.date_end_last_month
                }

                await this.helperFetchGetAllPengajuan(paramsLastMonth, (res) => {
                    if (res.code === 200) {
                        this.Data.listPengajuanLayananLastMonth = res.content
                    } else {
                        this.Data.listPengajuanLayananLastMonth = []
                    }
                })
            } else {
                this.Data.listPengajuanLayananLastMonth = []
            }


            this.handleFindPengajuanLayanan(this.Data.listPengajuanLayananThisMonth, this.Data.listPengajuanLayananLastMonth)
        },
        handleFindPengajuanLayanan(thisMonth, lastMonth) {
            // This Month
            let countThisMonthAll = thisMonth.filter(x => {
                if (x.service !== null) {
                    return x
                }
            }).length
            let countThisMonthHE = this.helperHandleFindTotalPengajuanLayanan('heuristic-evaluation', thisMonth)
            let countThisMonthST = this.helperHandleFindTotalPengajuanLayanan('software-testing', thisMonth)
            let countThisMonthSC = this.helperHandleFindTotalPengajuanLayanan('security-testing', thisMonth)
            let countThisMonthUT = this.helperHandleFindTotalPengajuanLayanan('usability-testing', thisMonth)
            let countThisMonthSO = this.helperHandleFindTotalPengajuanLayanan('alih-kelola', thisMonth)

            // Last Month
            let countLastMonthAll = lastMonth.filter(x => {
                if (x.service !== null) {
                    return x
                }
            }).length
            let countLastMonthHE = this.helperHandleFindTotalPengajuanLayanan('heuristic-evaluation', lastMonth)
            let countLastMonthST = this.helperHandleFindTotalPengajuanLayanan('software-testing', lastMonth)
            let countLastMonthSC = this.helperHandleFindTotalPengajuanLayanan('security-testing', lastMonth)
            let countLastMonthUT = this.helperHandleFindTotalPengajuanLayanan('usability-testing', lastMonth)
            let countLastMonthSO = this.helperHandleFindTotalPengajuanLayanan('alih-kelola', lastMonth)

            this.Data.listPengajuanLayanan = [{
                title: 'Semua Pengajuan',
                initials: 'SP',
                desc: this.Additional.labelCardPengajuanLayanan.all,
                countThisMonth: countThisMonthAll,
                countLastMonth: countLastMonthAll,
            },
            {
                title: 'Heuristic Evaluation',
                initials: 'HE',
                desc: this.Additional.labelCardPengajuanLayanan.card,
                countThisMonth: countThisMonthHE,
                countLastMonth: countLastMonthHE,
            },
            {
                title: 'Software Testing',
                initials: 'SOT',
                desc: this.Additional.labelCardPengajuanLayanan.card,
                countThisMonth: countThisMonthST,
                countLastMonth: countLastMonthST,
            },
            {
                title: 'Security Testing',
                initials: 'SET',
                desc: this.Additional.labelCardPengajuanLayanan.card,
                countThisMonth: countThisMonthSC,
                countLastMonth: countLastMonthSC,
            },
            {
                title: 'Service Operation',
                initials: 'SEO',
                desc: this.Additional.labelCardPengajuanLayanan.card,
                countThisMonth: countThisMonthSO,
                countLastMonth: countLastMonthSO,
            },
            {
                title: 'Usability Testing',
                initials: 'UT',
                desc: this.Additional.labelCardPengajuanLayanan.card,
                countThisMonth: countThisMonthUT,
                countLastMonth: countLastMonthUT,
            }
            ]
        },
        helperHandleFindTotalPengajuanLayanan(slug, isMonth) {
            return isMonth.filter(x => {
                if (x.service !== null) {
                    return x.service.slug === slug
                }
            }).length
        },

        onSelectMonth(item) {
            this.IsShowFilter.Calendar.additional.selectedMonth.selected.label = item.label
            this.IsShowFilter.Calendar.additional.selectedMonth.selected.value = item.value
            this.IsShowFilter.Calendar.isOpen = false
        },
        onSelectYear(item) {
            this.IsShowFilter.Calendar.additional.selectedYear.selected.label = item.label
            this.IsShowFilter.Calendar.additional.selectedYear.selected.value = item.value
            this.IsShowFilter.Calendar.isOpen = false
        },
        getOngoingRequest() {
            const params = {
                userId: this.Data.user.id
            }
            this.Request('GET', '/api/v3/request-dashboard/findByUserSummary', params, null, 'BASIC', (res) => {
                if (res.code === 200) {
                    let countOngoing = 0;
                    for (const item of res.content) {
                        if (item.type == "in_progress") {
                            countOngoing += parseInt(item.data);
                        }
                    }
                    this.ongoingRequest = countOngoing;
                }
            });
        },
    }
}

</script>

<style scoped>
.antrian-kerja .label-title {
    font-family: 'Nunito Sans';
    color: #3B3D39;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 24px;
}

.antrian-kerja .list-layanan {
    margin: 32px 32px 0 12px;
}

.antrian-kerja .list-layanan .title {
    font-family: 'Nunito Sans';
    color: var(--tertiary-tertiary-80, #2E3032);
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 16px;
}

.antrian-kerja .list-layanan .count {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 0;
}

.antrian-kerja .list-layanan .borders {
    height: 22px;
    display: inline-block;
    padding: 0 8px 0 8px;
    border-radius: 16px;
    justify-content: flex-start;
    align-items: center;
}


.antrian-kerja .list-layanan .borders .type-he {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    text-align: center;
}

.antrian-kerja .list-layanan .desc {
    font-family: 'Poppins';
    color: #8C8F93;
    font-weight: 400;
    font-size: 12px;
}

.antrian-kerja .list-layanan .calendar .desc-headmap {
    display: flex;
    width: 280px;
    padding: 4px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-left: 16px;
}

.antrian-kerja .list-layanan .calendar .circle {
    width: 10px;
    height: 10px;
    background: #E42313;
    border-radius: 50%;
    margin: 4px 4px 4px 0;
    /* fill: var(--primary-primary-50, #E42313); */
}

.antrian-kerja .list-layanan .calendar .calendar-line {
    display: flex;
    /* padding: 24px 16px; */
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    border-radius: 8px;
    border: 1px solid var(--tertiary-tertiary-30, #D9DDE3);
}

.detail-kegiatan .jumlah-layanan {
    background-color: #FFFFFF;
    height: 24px;
    margin-right: 8px;
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    border: 1px solid var(--tertiary-tertiary-30, #D9DDE3);
}


.detail-kegiatan .jumlah-layanan.selected,

.detail-kegiatan .jumlah-layanan:hover {
    border: 1px solid var(--primary-primary-50, #E42313);
    background-color: var(--primary-primary-20, #F9E4E4);
}


.tombol-merah {
    border: 1px solid var(--primary-primary-50, #E42313) !important;
    background-color: var(--primary-primary-20, #F9E4E4) !important;
}

.detail-kegiatan .detail-jumlah-layanan {
    color: var(--tertiary-tertiary-100, #151718);
    text-align: center;
    font-family: Nunito Sans;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;

}

.label-title {
    font-family: 'Poppins';
    color: #3B3D39;
    font-weight: 600;
    font-size: 24px;
}

.detail-kegiatan .label-title {
    font-family: 'Poppins';
    color: #3B3D39;
    font-weight: 500;
    font-size: 18px;
}

.banner,
.periode,
.pengajuan-layanan,
.jumlah-per-tahapan {
    margin-bottom: 24px;
}

.banner .card {
    border: 0;
}

.banner .card-body {
    background: #F2F4F6;
    border-radius: 8px;
    padding: 16px 24px;
}

.banner .title {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-weight: 700;
    font-size: 20px;

    margin-bottom: 8px;
}

.banner .desc {
    font-family: 'Nunito Sans';
    color: #5C5E61;
    font-weight: 400;
    font-size: 16px;

    margin-bottom: 0;
}

.pengajuan-layanan .list-layanan .item-layanan {
    border-right: 1px solid #D9DDE3;
}

.pengajuan-layanan .list-layanan {
    margin-top: 16px;
}

.pengajuan-layanan .list-layanan .title {
    font-family: 'Poppins';
    color: #2E3032;
    font-weight: 600;
    font-size: 18px;

    margin-bottom: 16px;
}

.pengajuan-layanan .list-layanan .count {
    font-family: 'Poppins';
    color: #2E3032;
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 0;
}

.pengajuan-layanan .list-layanan .badge-percentage {
    font-family: 'Nunito Sans';
    color: #FFFFFF;
    font-weight: 600;
    font-size: 12px;

    padding: 2px 8px;
    border-radius: 16px;
}

.pengajuan-layanan .list-layanan .badge-percentage.up {
    background-color: #52BD94;
}

.pengajuan-layanan .list-layanan .badge-percentage.down {
    background-color: #FF5630;
}

.pengajuan-layanan .list-layanan .desc {
    font-family: 'Nunito Sans';
    color: #8C8F93;
    font-weight: 400;
    font-size: 16px;
}

.detail-kegiatan .list-kegiatan {
    margin-top: 16px;
    margin-bottom: 16px;
    position: relative;
}

.detail-kegiatan .list-kegiatan .card {
    border: 1px solid #D9DDE3;
    border-radius: 8px;
}

.detail-kegiatan .list-kegiatan .card-body {
    padding: 8px 19px;
}

.detail-kegiatan .list-kegiatan .title {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-weight: 700;
    font-size: 16px;

    margin-bottom: 2px;
}

.detail-kegiatan .list-kegiatan .desc {
    font-family: 'Poppins';
    color: #8C8F93;
    font-weight: 400;
    font-size: 14px;
}

.detail-kegiatan .list-kegiatan .line {
    border-left: 3px solid #E42313;
    height: 24px;
    border-radius: 8px;
    position: absolute;
    z-index: 99999;
    margin-top: 20px;
}

.detail-kegiatan .scroll-max {
    height: 325px;
    max-height: 325px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 8px;
}

.detail-kegiatan .null-data {
    text-align: center;
    margin-top: 50px;
}

.detail-kegiatan .null-data .label {
    font-family: 'Nunito Sans';
    color: #8C8F93;
    font-weight: 600;
    font-size: 16px;

    margin-bottom: 0;
    margin-top: 16px;
}

.calendar .v-calendar {
    width: 100%;
}



/* rubah text style header calendar (Januari 2022) */
.calendar .v-calendar /deep/ .vc-title {
    font-family: 'Poppins';
    color: #3B3D39;
    font-weight: 500;
    font-size: 18px;
}

/* rubah jarak padding, margin */
.calendar .v-calendar /deep/ .vc-header,
.calendar .v-calendar /deep/ .vc-weeks {
    margin-bottom: 16px;
    padding: 0;
}

.calendar .v-calendar /deep/ .vc-arrows-container {
    padding-top: 25px;
    padding-right: 16px;
}

.calendar .v-calendar /deep/ .vc-pane {
    padding: 24px 16px 0 16px;
}

/* rubah warna header calendar (sen, sel, rab) */
.calendar .v-calendar /deep/ .vc-weekday {
    font-family: 'Nunito Sans';
    color: #7E818C;
    font-weight: 600;
    font-size: 12px;
}

/* rubah warna tanggal calendar (1, 2, 3) */
.calendar .v-calendar /deep/ .vc-day span {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-weight: 700;
    font-size: 12px;
    border-radius: 10%;
}

/* rubah style arrow */
.calendar .v-calendar /deep/ .vc-arrow {
    border: 1px solid #D9DDE3;
    border-radius: 100px;
    height: 26px;
    width: 26px;
}

.calendar .v-calendar /deep/ .vc-arrow svg {
    height: 18px;
    width: 18px;
    margin-bottom: 1px;
}

.calendar .v-calendar /deep/ .vc-arrow.is-left {
    margin-right: 16px;
}


.calendar .v-calendar /deep/ .vc-day.is-today span {
    border-bottom: 2px solid red;
    border-radius: 10%;
    background-color: white;
    color: #151718 !important;
}

.calendar .v-calendar /deep/ .vc-day span:focus {
    border: 2px solid #E42313;
    border-radius: 10%;
    background-color: white;
    color: #151718 !important;
}

/* perubah style untuk roadmap*/
.calendar .v-calendar /deep/ .vc-day-content .vc-focusable {
    border-radius: 10%;
}

.calendar .v-calendar /deep/ .vc-day.is-not-in-month span {
    font-family: 'Nunito Sans';
    color: #B1B5BA !important;
    font-weight: 700;
    font-size: 12px;

    opacity: unset !important;
}

.calendar .v-calendar /deep/ span.vc-day-content.vc-focusable.col-white {
    color: white;
}

.calendar .v-calendar /deep/ .vc-highlights .vc-highlight {
    border-radius: 2px !important;
    width: 28px;
    height: 28px;
}

.calendar .v-calendar /deep/ .vc-highlight.low {
    background-color: #FFDFA6;
}


.calendar .v-calendar /deep/ .vc-highlight.medium {
    background-color: #FFA07A;
}


.calendar .v-calendar /deep/ .vc-highlight.high {
    background-color: #E42313;
    color: white;
}


.daftar-pengajuan-layanan .search {
    margin-top: 16px;
    margin-bottom: 16px;
}

.daftar-pengajuan-layanan .table thead tr th {
    font-family: 'Poppins' !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    color: #8C8F93 !important;

    background-color: white !important;
    border-bottom: 1px solid #D9DDE3 !important;
    border-top: 0;
}

.daftar-pengajuan-layanan .table tbody td {
    font-family: 'Poppins' !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    color: #2E3032 !important;

    border: 0 !important;
}

.daftar-pengajuan-layanan .table thead tr th#left,
.daftar-pengajuan-layanan .table tbody tr td#left {
    padding-left: 0 !important;
}

.daftar-pengajuan-layanan .table tbody tr td#left img {
    width: 50px;
}

.daftar-pengajuan-layanan .table tbody tr td p {
    margin-bottom: 4px;
}

.daftar-pengajuan-layanan .table tbody tr td .progress,
.daftar-pengajuan-layanan .table tbody tr td .progress .progress-bar {
    height: 8px;
    border-radius: 100px;
    background-color: #F2F4F6;
}

.daftar-pengajuan-layanan .table tbody tr td .progress .progress-bar {
    background-color: #E42313;
}

.daftar-pengajuan-layanan .pagination .pagination-label {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    color: #151718;
}

.daftar-pengajuan-layanan .pagination .pagination-page-size {
    font-family: 'Nunito Sans';
    font-weight: 400;
    font-size: 14px;
    color: #262829;

    width: 60px;
    background-color: #FDF7F7;
    border: 1px solid #D9DDE3;
    box-shadow: 10px 24px 30px rgba(138, 138, 138, 0.02);
    border-radius: 4px;
}

.daftar-pengajuan-layanan .pagination .pagination-page-size {
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    text-indent: 1px !important;
    text-overflow: '' !important;
}

.daftar-pengajuan-layanan .null-data .label {
    font-family: 'Nunito Sans';
    color: #8C8F93;
    font-weight: 600;
    font-size: 16px;

    margin-bottom: 0;
    margin-top: 16px;
}

.daftar-pengajuan-layanan .null-data {
    margin-top: 40px;
}

.daftar-pengajuan-layanan .search .input-group-text {
    padding-right: 12px !important;
    padding-left: 10px;
}

.periode .filter-select {
    width: 215px;
    margin-bottom: 0;
}

.periode .filter-select-list {
    width: 315px;
    padding: 24px;
    margin-top: 12px;
    border: unset;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 0px 2px rgba(0, 0, 0, 0.2);
}

.periode .filter-select-period,
.filter-select-date-selected {
    margin-bottom: 16px;
}

.periode .filter-select-period .filter-select-period-list {
    border: 1px solid #F4CACA;
    border-radius: 15px;
    padding: 7.5px 8px;

    cursor: pointer;
}

.periode .filter-select-period .filter-select-period-list.selected,
.periode .filter-select-period .filter-select-period-list:hover {
    background-color: #F9E4E4;
    border: 1px solid #E42313;
    border-radius: 15px;
}

.periode .filter-select-period .filter-select-period-list label {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-weight: 700;
    font-size: 14px;

    cursor: pointer;
}

.periode .filter-select-date-selected label {
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 18px;

    cursor: pointer;
}

.periode .filter-select-date-selected label.filter-select-date-selected-month {
    color: #E42313;
}

.periode .filter-select-date-selected label.filter-select-date-selected-year {
    color: #2E3032;
}

.periode .filter-select-date-selected label.filter-select-date-selected-choose {
    font-family: 'Poppins';
    color: #8C8F93;
    font-weight: 400;
    font-size: 14px;

    cursor: default;
}

.periode .filter-select-list-month .not-month:nth-child(odd) {
    display: flex;
    justify-content: flex-end;
}

.periode .filter-select-list-month .not-month:nth-child(even) {
    display: flex;
    justify-content: flex-start;
}

.periode .filter-select-list-month .filter-select-list-month-list,
.periode .filter-select-list-year .filter-select-list-year-list {
    margin-bottom: 24px;
}

.periode .filter-select-list-month .filter-select-list-month-list label,
.periode .filter-select-list-year .filter-select-list-year-list label {
    font-family: 'Nunito Sans';
    color: #2E3032;
    font-weight: 600;
    font-size: 16px;

    cursor: pointer;
}

.periode .filter-select-list-month .filter-select-list-month-list label.selected,
.periode .filter-select-list-year .filter-select-list-year-list label.selected,
.periode .filter-select-list-month .filter-select-list-month-list label:hover,
.periode .filter-select-list-year .filter-select-list-year-list label:hover {
    color: #E42313;
}

.periode .filter-select-all-period button {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 42px;
    font-size: 16px;
}

.periode .filter-select-all-period button.batalkan {
    background-color: #F9E4E4;
    color: #E42313;
}

.periode .filter-select-all-period button.batalkan img {
    margin-right: 8px;
}

.periode .tooltip-periode {
    font-family: 'Poppins';
    color: #FDF7F7;
    font-weight: 400;
    font-size: 14px;

    margin-bottom: 0 !important;
}

.daftar-pengajuan-layanan .table tbody tr td .product-text {
    margin-left: 16px;
    margin-bottom: 0 !important;
}

.ongoing-badge {
    background-color: #FFFAF1;
    border: 1px solid #FFB020;
    border-radius: 8px;
    padding: 8px 16px;
    margin-bottom: 16px;
}

.ongoing-badge .counter {
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    font-weight: 600;
    color: #FFB020;
    margin-left: 4px;
    margin-bottom: 0;
}

.ongoing-badge .badge-text {
    margin-left: 24px;
}

.ongoing-badge .badge-text p {
    color: #FFB020;
    font-size: 16px;
    margin-bottom: 0;
}

.ongoing-badge .btn-detail {
    background-color: #FFEFD2;
    border-radius: 8px;
    padding: 4px 8px;
    color: #FFB020;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
}
</style>
