import { type } from '@testing-library/user-event/dist/type';
import React, { Component } from 'react';
import './T.css'



const $ = require('jquery');
$.DataTable = require('datatables.net');


class Table extends Component {
    componentDidMount() {
        console.log(this.el)
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                data: this.props.data,
                columns: [
                    { title: 'Name' },
                    { title: 'Position' },
                    { title: 'Office' },
                    { title: 'Extn.' },
                    { title: 'Start date' },
                    { title: 'Salary' },
                ]
            }
        )
    }
    componentWillUnmount() {
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }




    render() {
        return (
            <div>
                {/* <table ref="main" /> */}
                <table class="display" ref={el => this.el = el} width="100%"></table>
            </div>);
    }
}
export default Table;
