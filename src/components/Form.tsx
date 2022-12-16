import React from 'react';
import { useForm, SubmitHandler, useFieldArray, Control, useWatch } from 'react-hook-form';
import { InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from './Table';


interface Inputs {
    allData: {
        date: string,
        consultant: string,
        referred_by: string,
        service: {
            name: string,
            rate: number,
            qty: number,
            remark: string,
        }
    }[]
}
var dataSet = [
    ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
    ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
    ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '1562', '2009/01/12', '$86,000'],
    ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '6224', '2012/03/29', '$433,060'],
    ['Airi Satou', 'Accountant', 'Tokyo', '5407', '2008/11/28', '$162,700'],
    ['Brielle Williamson', 'Integration Specialist', 'New York', '4804', '2012/12/02', '$372,000'],
    ['Herrod Chandler', 'Sales Assistant', 'San Francisco', '9608', '2012/08/06', '$137,500'],
    ['Rhona Davidson', 'Integration Specialist', 'Tokyo', '6200', '2010/10/14', '$327,900'],
    ['Colleen Hurst', 'Javascript Developer', 'San Francisco', '2360', '2009/09/15', '$205,500'],
    ['Sonya Frost', 'Software Engineer', 'Edinburgh', '1667', '2008/12/13', '$103,600'],
    ['Jena Gaines', 'Office Manager', 'London', '3814', '2008/12/19', '$90,560'],
    ['Quinn Flynn', 'Support Lead', 'Edinburgh', '9497', '2013/03/03', '$342,000'],
    ['Charde Marshall', 'Regional Director', 'San Francisco', '6741', '2008/10/16', '$470,600'],
    ['Haley Kennedy', 'Senior Marketing Designer', 'London', '3597', '2012/12/18', '$313,500'],
    ['Tatyana Fitzpatrick', 'Regional Director', 'London', '1965', '2010/03/17', '$385,750'],
    ['Michael Silva', 'Marketing Designer', 'London', '1581', '2012/11/27', '$198,500'],
    ['Paul Byrd', 'Chief Financial Officer (CFO)', 'New York', '3059', '2010/06/09', '$725,000'],
    ['Gloria Little', 'Systems Administrator', 'New York', '1721', '2009/04/10', '$237,500'],
    ['Bradley Greer', 'Software Engineer', 'London', '2558', '2012/10/13', '$132,000'],
    ['Dai Rios', 'Personnel Lead', 'Edinburgh', '2290', '2012/09/26', '$217,500'],
    ['Jenette Caldwell', 'Development Lead', 'New York', '1937', '2011/09/03', '$345,000'],
    ['Yuri Berry', 'Chief Marketing Officer (CMO)', 'New York', '6154', '2009/06/25', '$675,000'],
    ['Caesar Vance', 'Pre-Sales Support', 'New York', '8330', '2011/12/12', '$106,450'],
    ['Doris Wilder', 'Sales Assistant', 'Sydney', '3023', '2010/09/20', '$85,600'],
    ['Angelica Ramos', 'Chief Executive Officer (CEO)', 'London', '5797', '2009/10/09', '$1,200,000'],
    ['Gavin Joyce', 'Developer', 'Edinburgh', '8822', '2010/12/22', '$92,575'],
    ['Jennifer Chang', 'Regional Director', 'Singapore', '9239', '2010/11/14', '$357,650'],
    ['Brenden Wagner', 'Software Engineer', 'San Francisco', '1314', '2011/06/07', '$206,850'],
    ['Fiona Green', 'Chief Operating Officer (COO)', 'San Francisco', '2947', '2010/03/11', '$850,000'],
    ['Shou Itou', 'Regional Marketing', 'Tokyo', '8899', '2011/08/14', '$163,000'],
    ['Michelle House', 'Integration Specialist', 'Sydney', '2769', '2011/06/02', '$95,400'],
    ['Suki Burks', 'Developer', 'London', '6832', '2009/10/22', '$114,500'],
    ['Prescott Bartlett', 'Technical Author', 'London', '3606', '2011/05/07', '$145,000'],
    ['Gavin Cortez', 'Team Leader', 'San Francisco', '2860', '2008/10/26', '$235,500'],
    ['Martena Mccray', 'Post-Sales support', 'Edinburgh', '8240', '2011/03/09', '$324,050'],
    ['Unity Butler', 'Marketing Designer', 'San Francisco', '5384', '2009/12/09', '$85,675'],
];
const Form = () => {
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<Inputs>({
        defaultValues: {
            allData: [{
                date: '',
                consultant: '',
                referred_by: '',
                service: {
                    name: '',
                    rate: 0,
                    qty: 0,
                    remark: '',
                }
            }]
        }
    });
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(fields);
        console.log(data);
    }

    const { fields, remove, append } = useFieldArray({
        name: 'allData',
        control,
        rules: {
            required: 'Please add 1 service'
        }
    })


    function getTotal(payload: Inputs['allData']) {
        let total = 0;
        for (const item of payload) {
            total = Number(total) + Number(Number.isNaN(item?.service?.rate) ? 0 : item.service.rate)
        }
        return total;
    }

    function GrandTotal({ control }: { control: Control<Inputs> }) {
        const tableValues = useWatch({
            control,
            name: 'allData',
        })
        return <p>{getTotal(tableValues)}</p>;
    }
    console.log(fields);

    return (
        <div>
            <Box sx={{ textAlign: 'left' }}>
                <Grid container spacing={12}>
                    <Grid sx={{ marginTop: '70px' }} item xs={4}>
                        <OutlinedInput
                            fullWidth
                            type='text'
                            placeholder='Search Patient'
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <u><h2>OPD Registration Details</h2></u>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{
                                // flexGrow: 1,
                                '& fieldset': {
                                    borderRadius: '5px',
                                }
                            }}>


                                <table>
                                    <th>#</th>
                                    <th>date</th>
                                    <th>name</th>
                                    <th>consultant</th>
                                    <th>rate</th>
                                    <th>qty</th>
                                    <th>remark</th>
                                    <th>action</th>
                                    <tbody>
                                        {
                                            fields.map((field, index) => {
                                                return (<tr key={field.id}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <OutlinedInput
                                                            id='date'
                                                            fullWidth
                                                            size='small'
                                                            type='text'
                                                            placeholder='Enter Date'
                                                            {...register(`allData.${index}.date`, {
                                                                required: true
                                                            })} />
                                                        <Typography color='red'>{errors?.allData?.[index]?.date ? "required" : ""}</Typography>
                                                    </td>
                                                    <td>
                                                        <OutlinedInput
                                                            id='name'
                                                            fullWidth
                                                            size='small'
                                                            type='text'
                                                            placeholder='Enter Name'
                                                            {...register(`allData.${index}.service.name`, {
                                                                required: true
                                                            })} />
                                                        <Typography color='red'>{errors?.allData?.[index]?.service?.name ? "required" : ""}</Typography>
                                                    </td>
                                                    <td>
                                                        <Select
                                                            id='consultant'
                                                            fullWidth
                                                            size='small'
                                                            type='text'
                                                            placeholder='Enter Consultant'
                                                            {...register(`allData.${index}.consultant`, {
                                                                required: true
                                                            })}
                                                        >
                                                            <MenuItem value='vatsal'>DK VATSAL</MenuItem>
                                                            <MenuItem value='stitching'>STITCHING CHARGES</MenuItem>
                                                            <MenuItem value='sawpnil'>ECHO Dr. SAWPNIL</MenuItem>
                                                        </Select>
                                                        <Typography color='red'>{errors?.allData?.[index]?.consultant ? "required" : ""}</Typography>
                                                    </td>
                                                    <td>
                                                        <OutlinedInput
                                                            id='rate'
                                                            fullWidth
                                                            size='small'
                                                            type='number'
                                                            placeholder='Enter Rate'
                                                            {...register(`allData.${index}.service.rate`, {
                                                                required: true
                                                            })} />
                                                        <Typography color='red'>{errors?.allData?.[index]?.service?.rate ? "required" : ""}</Typography>
                                                    </td>
                                                    <td>
                                                        <OutlinedInput
                                                            id='qty'
                                                            fullWidth
                                                            size='small'
                                                            type='number'
                                                            placeholder='Enter Qty'
                                                            {...register(`allData.${index}.service.qty`, {
                                                                required: true
                                                            })} />
                                                        <Typography color='red'>{errors?.allData?.[index]?.service?.qty ? "required" : ""}</Typography>
                                                    </td>
                                                    <td>
                                                        <OutlinedInput
                                                            id='remark'
                                                            fullWidth
                                                            size='small'
                                                            type='text'
                                                            placeholder='Enter Remark'
                                                            {...register(`allData.${index}.service.remark`)} />
                                                    </td>
                                                    <td><Button onClick={() => { remove(index) }}><DeleteIcon /> </Button></td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} >
                                        <h2> Grand Total:</h2>
                                        <GrandTotal control={control} />
                                    </Box>

                                </table>
                                <Typography>{errors.allData?.root?.message}</Typography>
                                <Button onClick={() => {
                                    append({
                                        date: '',
                                        consultant: '',
                                        referred_by: '',
                                        service: {
                                            name: '',
                                            rate: 0,
                                            qty: 0,
                                            remark: '',
                                        }
                                    })
                                }}>ADD</Button>

                            </Box>
                            <Box sx={{ textAlign: 'center', margin: '20px' }}>
                                <Button type='submit' variant='contained' color='success'>Submit</Button>
                            </Box>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <Table data={dataSet} />
        </div>
    );
};

export default Form;