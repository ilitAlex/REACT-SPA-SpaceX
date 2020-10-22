import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import Calendar from "./components/Calendar/Calendar";
import Details from "./components/Details/Details";
import FetchData from "./service/FetchData";

import './style.css'

class App extends React.Component {
    fetchData = new FetchData();
    state = {
        rocket: 'Falcon 1',
        rocketFeatures: null,
        rockets: [],
        company: null,
    };

    componentDidMount() {
        this.updateRocket();
        this.updateCompany();

    }



    updateRocket () {
        console.log('до', this.state);
        this.fetchData.getRocket()
            .then(data => {
                this.setState( { rockets: data.map(item => item.name)})
                return data
            })
            .then(data => data.find(item => item.name === this.state.rocket))
            .then(rocketFeatures => {
                  this.setState({rocketFeatures}, () => {console.log('после', this.state)});

            });

    };

    changeRocket = rocket => {
        this.setState({
            rocket
        }, this.updateRocket);
    };


    updateCompany = () => {
        this.fetchData.getCompany()
            .then(company => this.setState({ company }))
    };

    render(){


        return (

            <React.Fragment>
                <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
                <Main rocket={this.state.rocket}/>
                {this.state.rocketFeatures &&
                    <Features {...this.state.rocketFeatures} />}
                {this.state.company && <Footer {...this.state.company.links} />}
                <Footer />
            </React.Fragment>
        )
    }

}

export default App;
