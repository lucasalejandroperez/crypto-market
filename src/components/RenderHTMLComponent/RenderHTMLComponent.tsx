interface IRenderHTMLComponent {
  html: string;
}

export const RenderHTMLComponent = ( { html }: IRenderHTMLComponent) => {
  return (
    <div dangerouslySetInnerHTML={{__html: `${ html }`}}></div>
  )
}
