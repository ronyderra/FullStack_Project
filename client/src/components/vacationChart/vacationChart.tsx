import React from 'react';
import { Bar } from 'react-chartjs-2';
import "./vacationChart.css"
import { VacationsTableModel } from '../../models/vacation-model';
import axios from "axios";
import { NavLink } from 'react-router-dom';

export default class App extends React.Component {
    public constructor(props: any) {
        super(props);

        this.state = {
            labels: ['January', 'February', 'March',
                'April', 'May'],
            datasets: [
                {
                    label: 'Followers Chart',
                    backgroundColor: 'rgba(8,19,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [12, 3, 2, 6, 12]
                }
            ]
        }
    }

    public async componentDidMount() {
        try {
            const response = await axios.get<VacationsTableModel[]>("/api/vacation/allVacations", { withCredentials: true });
            // extracting labels
            const allVacations = response.data;
            const filterdVacations = allVacations.filter((d) => {
                if (d.followers > 0) {
                    return d.destination
                }
                return false;
            })
            const labelsData = filterdVacations.map(v => { return (v.destination) })
            this.setState({ labels: labelsData });
            // extracting Data
            const data = allVacations.map(f => { return f.followers })
            const filterdData = data.filter(f => f > 0)
            this.setState({
                datasets:
                    [{
                        label: 'Followers Chart',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: filterdData
                    }]
            })
        }
        catch (err) {
            alert(err.message);
        }
    }
    
    render() {
        return (
            <div className="barChart">
                <NavLink to="/adminHome" exact>go back</NavLink>
                <Bar
                    height={100}
                    // width={500}
                    data={this.state}
                    options={{
                        title: {
                            display: true,
                            text: 'Followers Bar Chart',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
}