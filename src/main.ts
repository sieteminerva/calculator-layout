/** 
  * 
  * This file is the main entry point for the Layout Calculator application.
  * It handles user interactions, form data retrieval, layout calculations,
  * and rendering the results in the browser.
  *
  * The application allows users to input dimensions for a source paper,
  * target rectangles, and margins. It then calculates the optimal layout
  * for cutting the target rectangles from the source paper, considering
  * the specified margins.
  *
  * The results can be displayed as SVG elements, base64 encoded SVG images,
  * canvas elements, or base64 encoded JPEG images.
  *
  * The application also provides options to customize the appearance of the
  * layout, such as colors for the paper, margins, and target rectangles.
  *
  * Key functionalities include:
  * - Retrieving and validating form data.
  * - Calculating the optimal layout using the `CalculatorLayoutCanvasClass`.
  * - Drawing the layout on an SVG or canvas element.
  * - Providing download links for the generated layout.
  * - Resetting the form and clearing the results.
  * - Setting default form values.
  * - Handling user-selected colors and applying them to the layout.
  * - Managing different output types (SVG, base64 SVG, canvas, base64 image).
  * @author YMGH
  */

import { ILayoutInput, ILayoutConfig } from './calculator-layout.interface.ts';
import './style.css';
import { CalculatorLayoutClass } from './calculator-layout.class.ts';

/* Element Variable Declaration */
const calculateButton = document.getElementById('calculate-button') as HTMLButtonElement;
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
const calculationForm = document.getElementById('calculation-form') as HTMLFormElement;
const paperColor = document.getElementById('paper-colorpicker') as HTMLInputElement;
const mainInnerColor = document.getElementById('main-inner-colorpicker') as HTMLInputElement;
const remainInnerColor = document.getElementById('remain-inner-colorpicker') as HTMLInputElement;
const mainOuterColor = document.getElementById('main-outer-colorpicker') as HTMLInputElement;
const remainOuterColor = document.getElementById('remain-outer-colorpicker') as HTMLInputElement;
const functionSelect = document.getElementById('select-function') as HTMLSelectElement;
const drawingContainer = document.getElementById('drawing') as HTMLElement;
const imageContainer = document.getElementById('image-container') as HTMLImageElement;
const downloadLink = document.getElementById('download-link') as HTMLAnchorElement;

/**
 * Initializes the form values with default sizes.
 * This function is used to set default values for the form, when the page is loaded.
 * The default values are for a DIN A4 sheet of paper (21cm x 29.7cm) divided into 15x17mm rectangles with a margin of 2mm.
 * 
 * @param {ILayoutInput} [value] Value you want to set
 */
function setDefaultFormValue(value?: ILayoutInput) {
  calculationForm.querySelector('#source-width')?.setAttribute('value', value ? value.source.width.toString() : '');
  calculationForm.querySelector('#source-height')?.setAttribute('value', value ? value.source.height.toString() : '');
  calculationForm.querySelector('#target-width')?.setAttribute('value', value ? value.target.width.toString() : '');
  calculationForm.querySelector('#target-height')?.setAttribute('value', value ? value.target.height.toString() : '');
  calculationForm.querySelector('#margin-width')?.setAttribute('value', value ? (value.margin as any).width.toString() : '');
  calculationForm.querySelector('#margin-height')?.setAttribute('value', value ? (value.margin as any).height.toString() : '');
}
/**
 *  Sets the configuration for the paper layout based on user-selected colors.
 * Converts HEX color inputs to RGB format and assigns them to the configuration object.
 * @returns 
 */

function setConfig() {
  /** Convert Hex color to RGB format. `#FF0000 => rgb(255, 0, 0)` **/
  function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }

  /* 
   * All config you can use to configure `CalculatorLayoutClass`, 
   * uncomment the item if you want to reconfigure 
   * note: `hexToRbg` is there because `html color picker` only accept hex type. 
   */
  const config: ILayoutConfig = {
    // fonts: { size: 3, family: 'sans-serif', unit: 'px' },
    // textColor: 'rgb(85, 85, 85)',
    // strokeColor: 'rgb(85, 85, 85)',
    lineWidth: 0.18,// lineWidth: 0.18, //default
    ratio: 20, // ** use `ratio = 28.346` to convert `1px to approximately 1cm` (in real size) **
    paperColor: hexToRgb(paperColor.value) as string,
    mainOuterColor: hexToRgb(mainOuterColor.value) as string,
    remainInnerColor: hexToRgb(remainInnerColor.value) as string,
    mainInnerColor: hexToRgb(mainInnerColor.value) as string,
    remainOuterColor: hexToRgb(remainOuterColor.value) as string
  };
  // console.log('CONFIG: ', config);
  return config;
}
function initFormValues() {
  /* This will print (See in the console)
   * Input Data (cm):    |   Total Plotting (unit): 
   * Source : 79 x 109   |   Main   : 6
   * Target : 22 x 32    |   Remain : 2
   * Margin : 2 x 3      |   Total  : 8  
   */
  const size1 = {
    source: { width: 79, height: 109 },
    target: { width: 22, height: 32 },
    margin: { width: 2, height: 3 }
  };

  /* This will print (See in the console)
   * Input Data (cm):    |   Total Plotting (unit): 
   * Source : 65 x 100   |   Main   : 7
   * Target : 43 x 12    |   Remain : 2
   * Margin : 1 x 1      |   Total  : 9 
   */
  const size2 = {
    source: { width: 65, height: 100 },
    target: { width: 43, height: 12 },
    margin: { width: 1, height: 1 }
  };

  /* This will print (See in the console)
   * Input Data (cm):    |   Total Plotting (unit): 
   * Source : 65 x 100   |   Main   : 14
   * Target : 23 x 12    |   Remain : 4
   * Margin : 1 x 1      |   Total  : 18
   */

  const size3 = {
    source: { width: 65, height: 100 },
    target: { width: 23, height: 12 },
    margin: { width: 1, height: 1 }
  };

  const size4 = {
    source: { width: 122, height: 244 },
    target: { width: 43, height: 12 },
    margin: { width: 1, height: 1 }
  };

  const size5 = {
    source: { width: 21, height: 29.7 },
    target: { width: 8, height: 12 },
    margin: { width: 0.5, height: 1 }
  };

  const values = [size1, size2, size3, size4, size5];
  // randomize between these 3 default sizes
  const i = Math.floor(Math.random() * values.length);

  setDefaultFormValue(values[i]);
}

/**
 *  Function that initializes the application by setting up the initial state of the form and adding event listeners to the relevant elements.
 * It hides the image container and download link, sets default form values, and initializes the selected format for the calculation.
 * It also adds event listeners to the `color inputs`, the `calculate button`, and the function `select dropdown`.
 */
function initializeApp() {
  // hide the image container from DOM, since we need it later
  imageContainer.style.display = 'none';

  // hide the download link from DOM, since we need it later
  downloadLink.style.display = 'none';

  // set default form value, realy helping on development process, uncomment if you want. 
  initFormValues();

  // declare selected format result, it will be used on `calculate()`
  let selectedFormat: 'svg-element' | 'base64-svg' | 'canvas-element' | 'base64-image' = 'base64-svg';

  /* Add event listeners to color inputs to trigger the setConfig function when changed  */
  [paperColor, mainInnerColor, remainInnerColor, mainOuterColor, remainOuterColor].forEach((el) => {
    el.addEventListener(('change'), () => {
      setConfig();
    });
  });

  /* Add event listeners to `Calculate Button` to trigger Calculate function  */
  calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('calculate button triggered!');
    calculate(selectedFormat);
  });

  /* Add event listeners to `select-function` to trigger Calculate function  */
  functionSelect.addEventListener('change', (e) => {
    e.preventDefault();
    selectedFormat = functionSelect.value as 'svg-element' | 'base64-svg' | 'canvas-element' | 'base64-image';
  });

}


/**
 *  Retrieves the values from the form and parses them into a object with source, target and margin properties.
 * Each property is an object with width and height properties.
 * 
 * @returns ILayoutInput
 */
function getFormData(): ILayoutInput {
  const formData = new FormData(calculationForm);
  const data = Object.fromEntries(formData);

  // console.log('DATA: ', data);
  return {
    source: {
      width: Number(data['source-width']),
      height: Number(data['source-height'])
    },
    target: {
      width: Number(data['target-width']),
      height: Number(data['target-height'])
    },
    margin: {
      width: Number(data['margin-width']),
      height: Number(data['margin-height'])
    }
  };
}

/**
 *  Function to sets the image source and download link for the calculated result.
 * It unhides the image container and download link, sets the image source to the provided drawing,
 * and sets the download link's href and download attributes.
 * 
 * @param {string} filename - The name of the file to be downloaded.
 * @param {string} drawing - The base64 encoded data URL or raw SVG string of the drawing.
 */
function setDownloadLink(filename: string, drawing: string) {
  // unhide image container
  imageContainer.style.display = 'block';
  // unhide download link
  downloadLink.style.display = 'inline-block';
  // set source for both
  imageContainer.src = drawing as string;
  downloadLink.href = drawing;
  downloadLink.download = filename;
}

/**
 *  Triggered when the calculate button is clicked. This function clears the console, reads the values from the form,
 * creates an instance of the CalculatorLayoutClass, calls the calculate method and logs the result, calls the draw
 * method and assigns the result to the src attribute of the svg-container element.
 * 
 * @param {('svg-element' | 'base64-svg' | 'canvas-element' | 'base64-image')} returnedFormat - Returned format you want to create.
 * @defaultValue 'base64-svg'
 */
function calculate(returnedFormat: 'svg-element' | 'base64-svg' | 'canvas-element' | 'base64-image') {
  console.clear();
  let drawing: string | SVGSVGElement | HTMLCanvasElement,
    container: HTMLCanvasElement | HTMLImageElement | SVGSVGElement,
    fileExtension: 'jpeg' | 'svg', filename: string = '';

  try {
    /** Getting form data **/
    const formValue = getFormData();
    /**Log the form value**/
    console.log(`Input Data (cm): \nSource : ${formValue.source.width} x ${formValue.source.height}\nTarget : ${formValue.target.width} x ${formValue.target.height}\nMargin : ${formValue.margin?.width} x ${formValue.margin?.height}`);
    /** Run the `CalculatorLayoutClass` **/
    formValue.useInline = false;
    const calculator = new CalculatorLayoutClass(formValue['source'], formValue['target'], formValue['margin'], formValue['useInline']);
    /** Set the `CalculatorLayoutClass` Config **/
    calculator.config = setConfig();
    /** Calculate the layout **/
    const calculation = calculator.calculate();
    /** Log the result **/
    console.log(`Total Plotting (unit): \nMain   : ${calculation.main.length}\nRemain : ${calculation.remain?.length || 0}\nTotal  : ${calculation.total}`);
    /** Set the filename **/
    const size = calculator.input;
    const title = `Layout_Source_${size.source.width}x${size.source.height}_Target_${size.target.width}x${size.target.height}_Result_${calculation.total}`;

    // **Check and clear existing child nodes**
    while (drawingContainer.firstChild) {
      drawingContainer.removeChild(drawingContainer.firstChild);
    }

    /** Check the returned format from the calculator **/
    switch (returnedFormat) {
      case 'svg-element':
        // console.log('Calculation result format : "svg-element"');

        // since `svg-element` not downloadable, hide the download link 
        downloadLink.style.display = 'none';
        // draw set parameter to false to return `SVGSVGElement`
        drawing = calculator.drawSvg(false);
        // assign to container
        container = drawing as SVGSVGElement;
        break;

      case 'base64-svg':
        // console.log('Calculation result format : "base64-svg"');

        // since its downloadable, set the file properties
        fileExtension = 'svg';
        filename = `${title}.${fileExtension}`;
        // draw
        drawing = calculator.drawSvg();
        // assign to container
        container = imageContainer as HTMLImageElement;
        // set download link
        setDownloadLink(filename, drawing as string);
        break;

      case 'canvas-element':
        // console.log('Calculation result format : "canvas-element"');

        // hide download link
        downloadLink.style.display = 'none';
        // draw set parameter to false to return `HTMLCanvasElement`
        drawing = calculator.drawCanvas(false);
        // assign to container
        container = drawing as HTMLCanvasElement;
        break;

      case 'base64-image':
        // console.log('Calculation result format : "base64-image"');

        // since its downloadable, set the file properties
        fileExtension = 'jpeg';
        filename = `${title}.${fileExtension}`;
        // draw
        drawing = calculator.drawCanvas();
        // assign to container
        container = imageContainer;
        // set download link
        setDownloadLink(filename, drawing as string);
        break;
    }
    // console.log('input :', calculator.input);

    /* Add result to the container */
    drawingContainer.appendChild(container);

    /* Add event listeners to `Reset Button` to clear childNodes  */
    resetButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Resetting Calculation!');
      // **Check and clear existing child nodes**
      while (drawingContainer.firstChild) {
        drawingContainer.removeChild(drawingContainer.firstChild);
      }

      calculator.reset();
      setDefaultFormValue();
    });

  } catch (error) {
    console.error(error);
    alert(error); // also show alert to the user
  }
}

/** RUN THE APP **/
initializeApp();