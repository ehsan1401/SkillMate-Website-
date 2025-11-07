
export type selectedItem = 'item0'|'item1'|'item2'|'item3'|'item4' ;

export type UserPanelItems = {
    selectedItem : selectedItem,
    TogglePanelItem : (item : selectedItem)=>void
}