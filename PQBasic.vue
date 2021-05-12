<template>
    <div :id="id" :options="dOptions"></div>
</template>

<script>
// import 'jquery-ui-pack/jquery-ui.css'
import 'jquery-ui-pack/jquery-ui.structure.css';
import 'jquery-ui-pack/jquery-ui.theme.css';
import 'pqgrid/pqgrid.min.css'; // ParamQuery Grid css files
import 'pqgrid/pqgrid.ui.min.css'; // add pqgrid.ui.css for jQueryUI theme support
import 'pqgrid/themes/bootstrap/pqgrid.css';
// import 'pqgrid/themes/steelblue/pqgrid.css';
import pq from 'pqgrid';
import 'pqgrid/localize/pq-localize-es';
import pqOptions from './PqBasicProps';
import allFunctionPqgrid from './config/functions';
import configurationGeneral from './config/generalOptionsPQgrid';

export default {
    name: "PQBasic",
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
            default: false
        },
        paginationSource: {
            type: String,
            default: 'local'
        },
        filter: {
            type: Boolean,
            default: false
        },
        filterType: {
            type: String,
            default: 'local'
        },
        sortType: {
            type: String,
            default: 'local'
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

            // Permite cargar la tabla con datos que son obtenidos mediante una variable
            // pasada a este componente
            if (this.sourceLocation == 'local') {
                setTimeout(() => {
                    this.pqGrid.option('dataModel.data', this.dataModel)
                    this.pqGrid.refreshDataAndView()
                }, 100)
            }
        }, 500);

    },
    methods: {
        configureOptionsPqGrid() {
            if (this.options) {
                this.dOptions = this.options;
                return;
            }
            // const opciones = configurationGeneral(this);
            this.dOptions = {
                ...configurationGeneral(this), // Se cargan las configuraciones generales de la tabla
                // Permite que el tamaño de las columnas se redimencionen hasta que el texto entre en una celda
                complete: function () {
                    this.flex();
                },
            }

            // Permite agregar configuraciones personalizadas, aparte de las que se obtienen por las
            // propiedades del componente
            if (this.extras !== null) {
                this.dOptions = Object.assign(this.dOptions, this.extras);
            }

            //Permite configurar los filtros, en caso de que sea habilitado
            this.configureFilter();

            //Permite configurar la fuente de datos
            this.configureDataSource();

            // Permite configurar un campo de busqueda general en el toolbar
            this.configureFilterToolbar();

            // Permite configurar el ordenamiento de los datos mediante las columnas
            this.configureSort();

            //Permite configurar la paginación de la tabla
            this.configurePagination();

            //Permite configurar una opción de exportar a excel y csv, en la barra del toolbar
            this.configureExportTable();

            //Permite agregar elementos extras en el toolbar
            this.configureExtraOptionsToolbar();

            //Permite configurar el ContextMenu en las celdas de la tabla
            this.configureContextMenu();

            if (this.formulas !== null) {
                this.dOptions.formulas = this.formulas;
            }

        },
        configureDataSource() {
            // Para este componente si el source es diferente de local
            // quiere decir que los datos van a ser obtenidos de manera "total"
            // desde el servidor, pero esto no quiere decir que se va a realizar una petición
            // por cada interacción sobre la tabla (ejm. paginació, y filtros)
            // SOLO ES PARA OBTENER TODOS LOS DATOS EN UNA SOLA PETICIÓN y manejarlos o manipularlos
            // de forma LOCAL
            if (this.sourceLocation != 'local') {
                this.dOptions.dataModel = {
                    location: 'remote',
                    method: 'GET',
                    url: this.urlSource,
                    postData: (ui) => {
                        if (this.postData) {
                            return this.postData;
                        }
                    },
                    getData: function (dataJSON) {
                        let data = dataJSON.data;
                        return {data: data};
                    }
                }
            }
        },
        configureExportTable() {
            // Permite agregar al Toolbar un select y boton que permitirá exportar los datos
            // que se encuentran localmente en la tabla a un archivo CSV o XSLX
            if (this.export) {
                const FileSaver = require('file-saver');

                this.dOptions.toolbar.items.push({
                    type: 'select',
                    cls: 'p-2',
                    label: 'Formato: ',
                    attr: 'id="export_format"',
                    options: [{xlsx: 'Excel', csv: 'Csv'}]
                });

                this.dOptions.toolbar.items.push({
                    type: 'button',
                    label: "Exportar",
                    icon: 'ui-icon-arrowthick-1-s',
                    init: function (el) {
                        el.style.fontSize = "12px";
                    },
                    listener: function (evt) {
                        var format = document.getElementById('export_format').value,
                            blob = this.exportData({
                                //url: "/pro/demos/exportData",
                                format: format,
                                nopqdata: true, //applicable for JSON export.
                                render: true
                            });
                        if (typeof blob === "string") {
                            blob = new Blob([blob]);
                        }
                        FileSaver.saveAs(blob, "pqGrid." + format);
                    }
                });
            }
        },
        configureExtraOptionsToolbar() {
            if (this.toolbarExtra != null) {

                this.toolbarExtra.forEach(item => {
                    this.dOptions.toolbar.items.push(item);
                });
            }
        },
         ...allFunctionPqgrid
    },
    watch: {
        postData(o, n) {
            if (this.postDataReactive) {
                this.pqGrid.refreshDataAndView();
            }
        }
    }
}
</script>

<style scoped>

</style>
