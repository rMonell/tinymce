type EventCallback = (event: any) => void;

export type GetContentFormatter = (editor: Editor, args: GetContentArgs) => any;
export type SetContentFormatter = (editor: Editor, content: any, args: SetContentArgs) => any;

export interface Selection {
  win: Window;

  setRng: (rng: Range) => void;
  getRng: () => Range | null;
  select: (node: Node, content?: boolean) => Node;
  setCursorLocation: (node?: Node, offset?: number) => void;
  isCollapsed: () => boolean;
}

export interface GetContentArgs {
  format: string;
  get: boolean;
  content?: any;
  getInner?: boolean;
  no_events?: boolean;
  [key: string]: any;
}

export interface SetContentArgs {
  format: string;
  set: boolean;
  content: any;
  no_events?: boolean;
  no_selection?: boolean;
}

export interface Content {
  addFormat: (format: string, formatGetter: GetContentFormatter, formatSetter: SetContentFormatter) => void;
}

export interface Editor {
  id: string;
  settings: Record<string, any>;
  inline: boolean;

  dom: any;
  editorCommands: any;
  selection: Selection;
  windowManager: any;
  ui: {
    registry: any;
  };

  getBody: () => HTMLElement;
  getDoc: () => Document;
  getWin: () => Window;
  getContainer: () => HTMLElement;
  getContentAreaContainer: () => HTMLElement;
  getElement: () => HTMLElement;

  getContent: (args?: Partial<GetContentArgs>) => string;
  setContent: (content: string, args?: Partial<SetContentArgs>) => void;
  content: Content;

  execCommand: (command: string, ui?: boolean, value?: any, args?: any) => boolean;

  nodeChanged: () => void;
  focus: () => void;
  hasFocus: () => boolean;
  remove: () => void;
  getParam: <T>(key: string, defaultValue?: T, type?: string) => T;

  setProgressState: (state: boolean, time?: number) => void;

  on: (event: string, callback: EventCallback) => void;
  once: (event: string, callback: EventCallback) => void;
  off: (event: string, callback: EventCallback) => void;
}
