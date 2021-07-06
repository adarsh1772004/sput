import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Header } from "react-native-elements";
import { PieChart } from "react-native-chart-kit";
import { SliderBox } from "react-native-image-slider-box";
export default class Covid extends React.Component {
  constructor() {
    super();
    this.state = {
      Covid19Global: "",
      Countries: "",
      images: [
        require("../slid1.png"),
        require("../slid2.webp"),
        require("../slid3.jpg"),
        require("../slid4.png"),
        require("../slide5.jpg"),
      ],
    };
  }
  Covid19Global = async () => {
    var link = "https://api.covid19api.com/summary";
    return fetch(link)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          Covid19Global: responseJson.Global,
          Countries: responseJson.Countries,
        });
      });
  };
  componentDidMount = async () => {
    await this.Covid19Global();
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../back.jpeg")}
          style={styles.backgroundImg}
        ></Image>
        <View style={styles.subContainer}>
          <Header
            backgroundColor="blue"
            centerComponent={{
              text: "Covid-19 Status",
              style: { fontWeight: "bold", fontSize: 22 },
            }}
          ></Header>

          <ScrollView>
            <SliderBox
              sliderBoxHeight={200}
              images={this.state.images}
              autoplay
              circleLoop
              dotColor="black"
              inactiveDotColor="white"
            ></SliderBox>
            <View style={{ marginTop: 50 }}>
              <Header
                backgroundColor="blue"
                centerComponent={{
                  text: "Prevention",
                  style: { fontWeight: "bold", fontSize: 22 },
                }}
              ></Header>
              <Text>
                To prevent the spread of COVID-19: Clean your hands often. Use
                soap and water, or an alcohol-based hand rub. Maintain a safe
                distance from anyone who is coughing or sneezing. Wear a mask
                when physical distancing is not possible. Don’t touch your eyes,
                nose or mouth. Cover your nose and mouth with your bent elbow or
                a tissue when you cough or sneeze. Stay home if you feel unwell.
                If you have a fever, cough and difficulty breathing, seek
                medical attention. Calling in advance allows your healthcare
                provider to quickly direct you to the right health facility.
                This protects you, and prevents the spread of viruses and other
                infections. Masks Masks can help prevent the spread of the virus
                from the person wearing the mask to others. Masks alone do not
                protect against COVID-19, and should be combined with physical
                distancing and hand hygiene. Follow the advice provided by your
                local health authority.
              </Text>
            </View>
            <View style={{ marginLeft: 80 }}>
              <View style={[styles.inputBox, { backgroundColor: "green" }]}>
                <Text>
                  New Confirmed:{this.state.Covid19Global.NewConfirmed}
                </Text>
                <Text>
                  Total Confirmed:{this.state.Covid19Global.TotalConfirmed}
                </Text>
              </View>
              <View style={[styles.inputBox, { backgroundColor: "red" }]}>
                <Text> New Deaths:{this.state.Covid19Global.NewDeaths}</Text>
                <Text>
                  {" "}
                  Total Deaths:{this.state.Covid19Global.TotalDeaths}
                </Text>
              </View>
              <View style={[styles.inputBox, { backgroundColor: "yellow" }]}>
                <Text>
                  New Recovered:{this.state.Covid19Global.NewRecovered}
                </Text>
                <Text>
                  Total Recovered:{this.state.Covid19Global.TotalRecovered}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputBox: {
    borderWidth: 2,
    width: 250,
    height: 80,
    marginTop: 70,

    borderRadius: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
