import { useState } from 'react';
import Statistics from 'components/Statistics/Statistics';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Notification from 'components/Notification/Notification';

export default function App() {
  const [state, setState] = useState ({good: 0, neutral: 0, bad: 0})

  const onLeaveFeedback = (option) => {
    setState(prevState => ({ ...prevState, [option]: prevState[option] + 1 }));
  }

  const countTotalFeedback = () => {
   return Object.values(state).reduce((ac, item) => (ac += item));
  };

  const countPositiveFeedbackPercentage = () => {
    return Number(
      Math.round((state.good / countTotalFeedback()) * 100)
    );
  };
  
  const { good, neutral, bad } = state;  
  // const keys = Object.keys(state);

  return (
    <div className="FeedBack">
      <Section title="Please leave feedback">
        <FeedbackOptions options={state} onLeaveFeedback={onLeaveFeedback} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positiveFeedback={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
}

// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onLeaveFeedback = e => {
//     this.setState(prevState => ({
//       [e.target.name]: prevState[e.target.name] + 1,
//     }));
//   };

  // countTotalFeedback = () => {
  //   return Object.values(this.state).reduce((accum, item) => accum + item, 0);
  // };

//   countPositiveFeedbackPercentage = () => {
//     return Number(
//       Math.round((this.state.good / this.countTotalFeedback()) * 100)
//     );
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positiveFeedback = this.countPositiveFeedbackPercentage();

//     return (
//       <div className="FeedBack">
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={this.state}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>
//         <Section title="Statistics">
//           {total ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positiveFeedback={positiveFeedback}
//             />
//           ) : (
//             <Notification message="There is no feedback"></Notification>
//           )}
//         </Section>
//       </div>
//     );
//   }
// };

// export default App;
