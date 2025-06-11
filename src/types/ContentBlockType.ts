// Note: the content types are dictated from the
// backend thus it can happen that not every type is
// used in the messages.
//
// noinspection JSUnusedGlobalSymbols

enum ContentBlockType
{
    ElementText = 'ElementText',
    ElementAudio = 'ElementAudio',
    ElementVideo = 'ElementVideo',
    ElementYoutube = 'ElementYoutube',
    ElementImage = 'ElementImage',
    ElementLink = 'ElementLink',
    ElementVimeo = 'ElementVimeo',
    QuestionOpen = 'QuestionOpen',
    QuestionBoolean = 'QuestionBoolean',
    QuestionMultipleChoice = 'QuestionMultipleChoice',
}

export default ContentBlockType;
