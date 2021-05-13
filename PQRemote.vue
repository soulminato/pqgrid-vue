<template>
    <div :options="dOptions">
    </div>
</template>

<script>
import 'jquery-ui-pack/jquery-ui.css'
import 'jquery-ui-pack/jquery-ui.structure.css';
import 'jquery-ui-pack/jquery-ui.theme.css';
import 'pqgrid/pqgrid.min.css'; // ParamQuery Grid css files
import 'pqgrid/pqgrid.ui.min.css'; // add pqgrid.ui.css for jQueryUI theme support
// import 'pqgrid/themes/bootstrap/pqgrid.css';
import 'pqgrid/themes/steelblue/pqgrid.css';
import pq from 'pqgrid';
import 'pqgrid/localize/pq-localize-es';
import pqOptions from './PqBasicProps';
import allFunctionPqgrid from './config/functions';
import configurationGeneral from './config/generalOptionsPQgrid';

export default {
    name: "PQRemote",
    data() {
        return {
            pqGrid: null,
            dOptions: {}
        }
    },
    props: {
        ...pqOptions,
        pagination: {
            type: Boolean,
            default: true
        },
        paginationSource: {
            type: String,
            default: 'remote'
        },
        filter: {
            type: Boolean,
            default: true
        },
        filterType: {
            type: String,
            default: 'remote'
        },
        sortType: {
            type: String,
            default: 'remote'
        },
        listenerFilter: {
            type: String,
            default: 'change'
        },
    },
    beforeCreate() {
    },
    beforeMount() {
        this.configureOptionsPqGrid();
    },
    mounted() {

        setTimeout(() => {
            this.pqGrid = pq.grid(this.$el, this.dOptions);

            setTimeout(() => {
                this.pqGrid.option('dataModel.data', this.dataModel)
                this.pqGrid.refreshDataAndView()
            }, 500)

        }, 100);

    },
    methods: {
        configureOptionsPqGrid() {
            if (this.options) {
                this.dOptions = this.options;
                return;
            }

            this.dOptions = {
                ...configurationGeneral(this), // Se cargan las configuraciones generales de la tabla

                dataModel: {
                    location: 'remote',
                    method: 'GET',
                    url: this.urlSource,
                    getData: function (dataJSON) {
                        let data = dataJSON.data;
                        return {curPage: dataJSON.curPage, totalRecords: dataJSON.totalRecords, data: data};
                    }
                },
                // columnTemplate: {width: 100},
            }

            // Permite agregar configuraciones personalizadas, aparte de las que se obtienen por las
            // propiedades del componente
            if (this.extras !== null) {
                this.dOptions = Object.assign(this.dOptions, this.extras);
            }

            //Se configura los campos de busqueda en los headers de cada columna
            this.configureFilter();

            //Permite configurar opciones de rehacer y deshacer en el toolbar
            this.configureHistory();

            //Configura un campo de busqueda en el toolbar en caso de que la propiedad
            // filter-location sea igual a "toolbar"
            this.configureFilterToolbar();

            //Se configura el ordenamiento de los datos
            this.configureSort();

            // Se configura la paginación de la tabla
            this.configurePagination();


        },
        ...allFunctionPqgrid
    }
}
</script>

<style scoped>

</style>
