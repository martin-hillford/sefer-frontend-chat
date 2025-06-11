type Dictionary<TContent> = {
    [Key in string | number]: TContent;
}

export default Dictionary;