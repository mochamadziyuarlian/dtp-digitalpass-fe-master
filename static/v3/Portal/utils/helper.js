import moment from 'moment';

const DATE = new Date();

export const TODAY = moment(String(new Date())).format('YYYY-MM-DD')

export const FIRST_DAY_OF_THIS_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth(), 1))).format('YYYY-MM-DD')
export const LAST_DAY_OF_THIS_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0))).format('YYYY-MM-DD')

export const FIRST_DAY_OF_LAST_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth() - 1, 1))).format('YYYY-MM-DD')
export const LAST_DAY_OF_LAST_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth(), 0))).format('YYYY-MM-DD')

export const THIS_MONTH = moment(String(new Date(DATE.getFullYear(), DATE.getMonth(), 1))).format('MMMM')
export const THIS_YEAR = moment(String(new Date(DATE.getFullYear(), DATE.getMonth(), 1))).format('YYYY')

export const THIS_MONTH_OF_HEADMAP = moment(String(new Date(DATE.getFullYear(), DATE.getMonth(), 1))).format('MM')

export const LIST_MONTH = [{
    label: 'Januari',
    value: '01'
},
{
    label: 'Februari',
    value: '02'
},
{
    label: 'Maret',
    value: '03'
},
{
    label: 'April',
    value: '04'
},
{
    label: 'Mei',
    value: '05'
},
{
    label: 'Juni',
    value: '06'
},
{
    label: 'Juli',
    value: '07'
},
{
    label: 'Agustus',
    value: '08'
},
{
    label: 'September',
    value: '09'
},
{
    label: 'Oktober',
    value: '10'
},
{
    label: 'November',
    value: '11'
},
{
    label: 'Desember',
    value: '12'
}
]

export const LIST_TRIWULAN = [{
    label: 'Triwulan 1',
    value: '01,03'
},
{
    label: 'Triwulan 2',
    value: '04,06'
},
{
    label: 'Triwulan 3',
    value: '07,09'
},
{
    label: 'Triwulan 4',
    value: '10,12'
}
]

const getYearList = (startYear = 2019) => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let i = startYear; i <= currentYear; i++) {
        yearList.push({
            label: i.toString(),
            value: i.toString()
        },);
    }
    return yearList;
};

export const LIST_YEAR = getYearList()