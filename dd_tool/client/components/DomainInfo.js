import React, {Component} from 'react';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import $ from 'jquery';
import Home from 'material-ui/svg-icons/action/home';
class DomainInfo extends Component{

    constructor(props) {
      super(props);
      this.state = {
        expanded: this.props.statedCard,
        currentTags: '',
      };
    };
  
    getTags(){
      $.post(
        '/getAvailableTags',
        {'session': JSON.stringify(this.props.session), 'event': 'Tags'},
        function(tagsDomain) {
          this.setState({currentTags: tagsDomain['tags']});
        }.bind(this)
      );
    }
  
    componentWillMount = () => {
      this.getTags();
      this.setState({expanded: this.props.statedCard, });
    };
  
    componentWillReceiveProps  = (newProps) => {
         this.setState({expanded: this.props.statedCard}, function() {
              this.setState({expanded: this.props.statedCard});
         });
     };
  
    handleExpandChange = (expanded) => {
      this.setState({expanded: expanded});
      if(expanded){
        this.getTags();
        this.props.setActiveMenu(expanded, 2);
      }
    };
  
    handleToggle = (event, toggle) => {
      console.log("handleToggle");
      this.setState({expanded: toggle});
    };
  
    handleExpand = () => {
      console.log("expand");
      this.setState({expanded: true});
    };
  
    handleReduce = () => {
      console.log("reduce");
      this.setState({expanded: false});
    };
  
    render(){
      return(
        <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={styles.card}>
             <CardHeader
               title="Domain information"
               avatar={ <Avatar color={'white'} backgroundColor={'#7940A0'} size={this.props.sizeAvatar} style={styles.avatar} icon={<Home />} />}
               style={styles.cardHeader}
               actAsExpander={true}
               showExpandableButton={true}
             />
             <CardMedia expandable={true} style={styles.cardMedia}>
              <p>Domain: {this.props.nameDomain}</p>
              <p>Labeled data:</p>
              <p style={{paddingLeft:"8px" ,fontSize: "12px", }}>Relevant: {this.state.currentTags["Relevant"]}</p>
              <p style={{paddingLeft:"8px",fontSize: "12px", }}>Irrelevant: {this.state.currentTags["Irrelevant"]}</p>
              <p style={{paddingLeft:"8px",fontSize: "12px", }}>Neutral: {this.state.currentTags["Neutral"]}</p>
             </CardMedia>
         </Card>
      )
    }
  }
  
  export default DomainInfo;
  