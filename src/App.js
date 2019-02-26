import React, { Component } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import ImageComponent from "./components/ImageComponent";
import { Button } from "antd";
const uuidv4 = require("uuid/v4");

const START_SCREEN = "START_SCREEN";
const GOOD_SCREEN = "GOOD_SCREEN";
const BAD_SCREEN = "BAD_SCREEN";
const BAD_SCREEN2 = "BAD_SCREEN2";
const END_SCREEN = "END_SCREEN";

class App extends Component {
  state = {
    hash: "",
    screen: START_SCREEN,
    dotLocation: null
  };

  makeid() {
    return uuidv4();
  }
  componentDidMount() {
    this.setState({ hash: this.makeid() });
  }
  handleClick = e => {
    e.preventDefault();
    this.setState({ screen: GOOD_SCREEN, dotLocation: 1 });
  };
  afterCapture = () => {
    const { screen, dotLocation } = this.state;

    if (dotLocation >= 5 && screen === GOOD_SCREEN) {
      // Change to bad screen
      this.setState({ dotLocation: 1, screen: BAD_SCREEN });
    } else if (dotLocation >= 5 && screen === BAD_SCREEN) {
      
      this.setState({ dotLocation: 1, screen: BAD_SCREEN2 });
    } else if(dotLocation >= 5 && screen === BAD_SCREEN2){
      this.setState({ dotLocation: null, screen: END_SCREEN });
    } else {
      this.setState({ dotLocation: dotLocation + 1 });
    }
  };
  renderDot = () => {
    const { dotLocation } = this.state;
    if (dotLocation === 1)
      return <div className="dot" style={{ left: 0, top: 0 }} />;
    if (dotLocation === 2)
      return <div className="dot" style={{ right: 0, top: 0 }} />;
    if (dotLocation === 3)
      return <div className="dot" style={{ left: 0, bottom: 0 }} />;
    if (dotLocation === 4)
      return <div className="dot" style={{ right: 0, bottom: 0 }} />;
    if (dotLocation === 5)
      return (
        <div
          className="dot"
          style={{ left: "50%", right: "50%", top: "50%" }}
        />
      );

    return null;
  };

  getGuidelines(){
    const { screen } = this.state;
    if(screen === GOOD_SCREEN){
      return (
        <div>
          <p>Sätt dig längst in på stolen som ger stöd för hela låret, gärna med ett knytnävsstor utrymme mellan sitsen och knävecken.</p>
          <p>Placera bildskärmen på en armlängds avstånd med den övre kanten i höjd med ögonen eller aningen lägre.</p>
          <p>Sträck på dig.</p>
          <p>Se till att bordet är på en höjd som gör att du sitter avslappnad i axlar och skuldror när du knappar på tangentbordet.</p>
        </div>
      )
    } else if(screen === BAD_SCREEN){
      return (
        <div>
          <p>Sitt som en "hösäck", alltså sjunk ner i stolen och belasta ländryggen på ett felaktigt sätt. </p>
        </div>
      )
    } else if (screen === BAD_SCREEN2){
      return (
        <div>
          <p>Luta dig fram över skrivbordet med uppdragna axlar och belasta ryggen på ett felaktigt sätt</p>
        </div>
      )
    }
  }

  render() {
    const { screen, dotLocation } = this.state;

    return (
      <div className="app">
        {this.renderDot()}
        <div className="sidebar">
          <h2 class="title">Riktlinjer</h2>
         {
           this.getGuidelines()
         }
        </div>
        <div className="main">
          {screen === START_SCREEN && (
            <div>
              <div>
              <h2>Hej!</h2>
              <p>Var vänlig och läs igenom innan start.</p>
              <p>Experimentet tar ungefär 1 minut.</p>
              <p>Det här är ett experiment till en kandidatuppsats inom djupinlärning vid KTH av Oskar Råhlén och Sacharias Sjöqvist. Vårt mål med uppsats är att studera om det är möjligt att med hjälp av maskininlärning och datoranvändarens kamera avgöra om användaren sitter ergonomiskt korrekt vid datorn eller inte. Experimentet kommer bestå av att ta ett antal bilder. Dessa bilder kommer vara anonyma, sparas krypterat och kommer användas till att träna maskininlärningsmodell. Bara vi kommer ha tillgång till bilderna och bilderna kommer raderas permanent efter experimentet.</p>
              <p>Experimentet förutsätter att du sitter framför en <b>laptop</b> med en <b>webbkamera</b>. Är detta inte fallet så ber vi dig byta dator innan du utför experimentet. Du bör även ha webbsidans fönster i helskärm eller låta fönstret täcka en så stor del av skärmen som möjligt.</p>
              <p>Kontakt: sacharias.sjoqvist@gmail.com</p>

              <h3>Tillvägagångssätt</h3>
              <p>När du trycker på knappen Start så kommer du se en kameravy, en röd prick och en knapp med texten “ta foto”. Du börjar med att följa riktlinjerna till vänster. Riktlinjerna kommer alltid finnas tillgängliga. Du ska sedan hålla blicken på den röda pricken och klicka på knappen “ta foto”. Pricken kommer då byta position och processen kommer upprepas. Det är totalt fem foton i ergonomisk korrekt position.</p>
              
              <p>Därefter kommer ett liknande test där du istället ska sitta på ett inkorrekt sätt framför datorn. Här är det upp till din fantasi att återskapa verklighetstrogna positioner. Tänk er gärna hur ni sitter ibland som inte motsvarar de ergonomiska riktlinjerna. T.ex. framåtlutad, nerhasad, etc. Ta sedan fem sådana foton.</p>
              <p>Experimentet är sedan färdigt. Inga av stegen är tidsbegränsade, så ta den tid ni behöver.</p>
              
              <p>Lycka till!</p>
              </div>

              <Button type="primary" onClick={this.handleClick}>
                Start
              </Button>
            </div>
          )}
          {screen === GOOD_SCREEN && (
            <div className="photo-view">
              <h2>Ergonomiskt korrekt position</h2>
              <p>Sitt enligt riktlinjerna till vänster och håll blicken på den röda cirkeln. Tryck sedan på knappen “Ta foto”.</p>
              <ImageComponent
                folder="oskarsbilder/"
                filename={"good1-" + dotLocation}
                hash={this.state.hash}
                afterCapture={this.afterCapture}
              />
            </div>
          )}
          {screen === BAD_SCREEN && (
            <div className="photo-view">
              <h2>Ergonomiskt felaktig position</h2>
              <p>Sitt enligt riktlinjerna till vänster och håll blicken på den röda cirkeln. Tryck sedan på knappen “Ta foto”.</p>
              <ImageComponent
                folder="oskarsbilder/"
                filename={"bad1" + dotLocation}
                hash={this.state.hash}
                afterCapture={this.afterCapture}
              />
            </div>
          )}

          {screen === BAD_SCREEN2 && (
            <div className="photo-view">
              <h2>Ergonomiskt felaktig position</h2>
              <p>Sitt enligt riktlinjerna till vänster och håll blicken på den röda cirkeln. Tryck sedan på knappen “Ta foto”.</p>
              <ImageComponent
                folder="oskarsbilder/"
                filename={"bad2" + dotLocation}
                hash={this.state.hash}
                afterCapture={this.afterCapture}
              />
            </div>
          )}

          {screen === END_SCREEN && (
            <div>
              <h2>Färdigt!</h2>
              <div className="information">
              <p>Sitt enligt riktlinjerna till vänster och håll blicken på den röda cirkeln. Tryck sedan på knappen “Ta foto”.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
