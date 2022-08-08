// this service is used to generate the css content based on the livepage settings json object


// function to generate the css content based on the livepage settings json object. This function get as parameter the livepage settings json object
function generate_css_content(livepage_settings) {
    // declare a new string to store the css content
    let css_content = "";
    
    // add root css selector
    css_content += `
    :root {
        --gradient_color_one: ${livepage_settings["bg_gradient_color_one"]};
        --gradient_color_two: ${livepage_settings["bg_gradient_color_two"]}; 
        }
    `;

    // add the background_gradient css class
    css_content += `
    position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
            background: linear-gradient(to top right, var(--gradient_color_one) 0%, var(--gradient_color_two) 100%);
    `;

    if(livepage_settings["text-align"] == "middle"){
        css_content += `
        .align-content-middle{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
        }

        .align-content-class{
            padding-bottom: ${livepage_settings["padding-bottom"]};
        }
        `;
    }

    if(livepage_settings["text-align"] == "center"){
        css_content += `
        .align-content-class{
            text-align: center;
            padding-bottom: ${livepage_settings["padding-bottom"]};
        }

        .align-content-middle{}
        `;
    }

    if(livepage_settings["text-align"] == "left"){
        css_content += `
        .align-content-class{
            padding-left: ${livepage_settings["padding-left"]};
            padding-bottom: ${livepage_settings["padding-bottom"]};
        }

        .align-content-middle{}
        `;
    }

    return css_content;

}

module.exports = function(obj){
    return generate_css_content(obj);
};