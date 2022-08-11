// this service is used to generate the css content based on the livepage settings json object

// function to generate the css content based on the livepage settings json object. This function get as parameter the livepage settings json object
function generate_css_content(livepage_settings) {
    // declare a new string to store the css content
    let css_content = "";
    let title_display = "";
    let showCurrentStrofaNumber_display = "";

    if(livepage_settings["showTitle"]=="no"){
        title_display = "none";
    }
    if(livepage_settings["showCurrentStrofaNumber"]=="no"){
        showCurrentStrofaNumber_display = "none";
    }

    css_content += `
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, font, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td {
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-weight: inherit;
	font-style: inherit;
	font-size: 100%;
	font-family: inherit;}
    `;

    // add root css selector
    css_content += `
    :root {
        --gradient_color_one: ${livepage_settings["bg_gradient_color_one"]};
        --gradient_color_two: ${livepage_settings["bg_gradient_color_two"]}; 
        }
    `;

    // add the background_gradient css class
    css_content += `
    .background_gradient{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
            background: linear-gradient(to top right, var(--gradient_color_one) 0%, var(--gradient_color_two) 100%);
    }
    `;

    css_content += `
        .text-style-class{
            font-family: ${livepage_settings["font-family"]};
            font-size: ${livepage_settings["font-size"]}px;
            color: ${livepage_settings["font-color"]};
        }
    `;

    css_content += `
        .title-style-class{
            font-family: ${livepage_settings["font-family"]};
            font-size: ${livepage_settings["font-size"]+10}px;
            color: ${livepage_settings["font-color"]};
            font-weight: bold;
            display: ${title_display};
        }

        .verse-nb-class{
            display: ${showCurrentStrofaNumber_display};
            font-weight: bold;
        }
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
            padding-bottom: ${livepage_settings["padding-bottom"]}px;
        }
        `;
    }

    if(livepage_settings["text-align"] == "center"){
        css_content += `
        .align-content-class{
            text-align: center;
            padding-bottom: ${livepage_settings["padding-bottom"]}px;
        }

        .align-content-middle{}
        `;
    }

    if(livepage_settings["text-align"] == "left"){
        css_content += `
        .align-content-class{
            padding-left: ${livepage_settings["padding-left"]}px;
            padding-bottom: ${livepage_settings["padding-bottom"]}px;
        }

        .align-content-middle{}
        `;
    }

    return css_content;

}

module.exports = function(obj){
    return generate_css_content(obj);
};