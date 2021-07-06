import React from "react";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Dimensions,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { PieChart } from "react-native-chart-kit";

export default class Covid extends React.Component {
  constructor() {
    super();
    this.state = {
      HospitalGlobal: "",
      States: "",
      search: "",
      arData: [],
      modalVisable: false,
      item: "",
    };
  }
  Covid19Global = async () => {
    var link =
      "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true";
    return fetch(link)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          States: responseJson.regionData,
        });
      });
  };

  componentDidMount = async () => {
    await this.Covid19Global();
    var array = [];
    for (var i in this.state.States) {
      array.push(this.state.States[i]);
    }
    await this.setState({
      arData: array,
    });
  };
  SearchFilterFunction = (text) => {
    const newData = this.state.arData.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.region
        ? item.region.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      States: newData,
      search: text,
    });
  };
  showModal = () => {
    return (
      <Modal visible={this.state.modalVisable}>
        <View style={styles.modalContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {this.state.item.region}
          </Text>
          <PieChart
            data={[
              {
                name: "ActiveCases",
                population: this.state.item.activeCases,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "RecoveredCases",
                population: this.state.item.recovered,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Deaths",
                population: this.state.item.deceased,
                color: "#000000",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute //for the absolute number remove if you want percentage
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                modalVisable: false,
              });
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={{flex:1}}>
        <Image
          source={require("../statecoro.jpg")}
          style={styles.backgroundImg}
        ></Image>
        <View
          style={{
          
            marginTop:30,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {this.showModal()}
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={(text) => this.SearchFilterFunction("")}
            placeholder="Type Here..."
            value={this.state.search}
          />
          <FlatList
            data={this.state.States}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={async () => {
                      await this.setState({
                        modalVisable: true,
                        item: item,
                      });
                    }}
                  >
                    <View style={styles.subcontainer}>
                      <Text style={styles.text}>{item.region}</Text>
                    </View>
                    <View style={styles.subcontainer2}>
                      <Text>Recovered Cases:{item.recovered}</Text>
                      <Text>Active Cases:{item.activeCases}</Text>
                      <Text>Deaths:{item.deceased}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          ></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subcontainer: {},
  text: {
    marginLeft: 10,
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    borderWidth: 7,
    width: 362,
    height: 120,
    borderRadius: 25,
    backgroundColor:"#a1fcf0",
    marginTop: 40,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 80,
  },
  button: {
    backgroundColor: "green",
    margin: 50,
    width: 100,
    marginLeft: 120,
    alignItems: "center",
    borderWidth: 3,
  },
  subcontainer2: {},
});
