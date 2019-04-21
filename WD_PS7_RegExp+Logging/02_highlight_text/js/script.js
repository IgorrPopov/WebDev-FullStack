const MATCH_REGEX = /^\/.+\/((g(im?|mi?)?|i(gm?|mg?)?|m(gi?|ig?)?)?)$/;

const selectHighlighterTextareaClass = 'highlighter__textarea';
const selectHighlighterRegexInputClass = 'highlighter__regex-input';
const selectHighlighterOutputClass = 'highlighter__output';
const selectHighlighterErrorMessageClass = 'highlighter__error-message';
const selectHighlighterFormClass = 'highlighter__form';
const selectHighlighterLoremClass = 'highlighter__lorem';

$(() => {
    const $textarea = $(`.${selectHighlighterTextareaClass}`);
    const $regExInput = $(`.${selectHighlighterRegexInputClass}`);
    const $output = $(`.${selectHighlighterOutputClass}`);

    $(`.${selectHighlighterFormClass}`).on('submit', (event) => {
       event.preventDefault();
       // remove error msg and output text
       $(`.${selectHighlighterErrorMessageClass}`).remove();
       $output.html('');

       let inputText = $textarea.val();
       const inputRegExString = $regExInput.val();

       if(!inputText.length) {
           addErrorMsg($textarea, 'type some text');
       }
       if(!inputRegExString.length) {
           addErrorMsg($regExInput ,'type some regex');
       } else if(!inputRegExString.match(MATCH_REGEX)){
           addErrorMsg($regExInput, 'regex does not match the pattern (/regex/flags)');
       } else {
           try {
               const regEx = createRegEx(inputRegExString);
               $output.html(inputText.replace(regEx, match => '<mark>' + match + '</mark>'));
           } catch (e) {
               addErrorMsg($regExInput, 'invalid regex');
           }
       }
    });

    // get Lorem
    $(`.${selectHighlighterLoremClass}`).on('click', () => {
        $.getJSON('https://baconipsum.com/api/?callback=?', {
                'type':'meat-and-filler',
                'paras':'1'
            },
            (resp) => $textarea.val((resp && resp.length > 0) ? resp : ''));
    });
});

function createRegEx(inputRegExString) {
    let rearIndex = inputRegExString.length - 1;
    const flags = [];

    while (inputRegExString[rearIndex] !==  '/' && rearIndex >= 0) {
        flags.push(inputRegExString[rearIndex--]);
    }

    return new RegExp(
        inputRegExString.slice(1, inputRegExString.length - flags.length - 1),
        flags.join('')
    );
}

const addErrorMsg = ($elemnt, message) =>
    $elemnt.after(`<p class="${selectHighlighterErrorMessageClass}">${message}</p>`);