import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0'); 
  const [currentValue, setCurrentValue] = useState(''); 
  const [operator, setOperator] = useState(null); 
  const [previousValue, setPreviousValue] = useState(null); 

  const handleNumberPress = (num) => {
    if (display === '0' && num !== '.') { 
      setDisplay(num);
      setCurrentValue(num);
    } else if (num === '.' && currentValue.includes('.')) {
      return;
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperatorPress = (op) => {
    if (currentValue === '') return;

    if (previousValue !== null && operator !== null) {
      calculateResult();
    }
    setOperator(op);
    setPreviousValue(currentValue);
    setCurrentValue('');
    setDisplay(op); 
  };

  const handleEqualPress = () => {
    if (currentValue === '' || previousValue === null || operator === null) {
      return;
    }
    calculateResult();
    setOperator(null);
    setPreviousValue(null);
  };

  const calculateResult = () => {
    let result = 0;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);

    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        if (curr === 0) {
          setDisplay('Erro');
          setCurrentValue('');
          setPreviousValue(null);
          setOperator(null);
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }
    setDisplay(result.toString());
    setCurrentValue(result.toString());
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator(null);
    setPreviousValue(null);
  };

  const handlePercentage = () => {
    if (currentValue !== '') {
      const num = parseFloat(currentValue);
      const percentage = (num / 100).toString();
      setDisplay(percentage);
      setCurrentValue(percentage);
    }
  };

  const handleToggleSign = () => {
    if (currentValue !== '' && display !== '0') {
      const num = parseFloat(currentValue);
      const toggled = (-num).toString();
      setDisplay(toggled);
      setCurrentValue(toggled);
    }
  };

  const Button = ({ text, onPress, type = 'number' }) => {
    const buttonStyles = [styles.button];
    const textStyles = [styles.buttonText];

    if (type === 'operator') {
      buttonStyles.push(styles.buttonOperator);
      textStyles.push(styles.textOperator);
    } else if (type === 'clear') {
      buttonStyles.push(styles.buttonClear);
      textStyles.push(styles.textClear);
    } else if (type === 'equal') {
      buttonStyles.push(styles.buttonEqual);
      textStyles.push(styles.textEqual);
    } else if (text === '0') {
      buttonStyles.push(styles.buttonZero);
    }

    return (
      <TouchableOpacity style={buttonStyles} onPress={() => onPress(text)}>
        <Text style={textStyles}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button text="AC" onPress={handleClear} type="clear" />
          <Button text="+/-" onPress={handleToggleSign} type="clear" />
          <Button text="%" onPress={handlePercentage} type="clear" />
          <Button text="/" onPress={handleOperatorPress} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="7" onPress={handleNumberPress} />
          <Button text="8" onPress={handleNumberPress} />
          <Button text="9" onPress={handleNumberPress} />
          <Button text="*" onPress={handleOperatorPress} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="4" onPress={handleNumberPress} />
          <Button text="5" onPress={handleNumberPress} />
          <Button text="6" onPress={handleNumberPress} />
          <Button text="-" onPress={handleOperatorPress} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="1" onPress={handleNumberPress} />
          <Button text="2" onPress={handleNumberPress} />
          <Button text="3" onPress={handleNumberPress} />
          <Button text="+" onPress={handleOperatorPress} type="operator" />
        </View>
        <View style={styles.row}>
          <Button text="0" onPress={handleNumberPress} />
          <Button text="." onPress={handleNumberPress} />
          <Button text="=" onPress={handleEqualPress} type="equal" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  displayContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '300',
  },
  buttonsContainer: {
    flex: 4,
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  button: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 5,
    minHeight: 75,
  },
  buttonZero: {
    flex: 2, 
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 35,
  },
  buttonOperator: {
    backgroundColor: '#FF9500',
  },
  textOperator: {
    color: '#fff',
  },
  buttonClear: {
    backgroundColor: '#A5A5A5',
  },
  textClear: {
    color: '#000',
  },
  buttonEqual: {
    backgroundColor: '#FF9500',
  },
  textEqual: {
    color: '#fff',
  },
});