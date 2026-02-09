function distroTest(DmnJS) {

  it('should expose globals', function() {

    if (!DmnJS) {
      throw new Error('global not bound');
    }
  });


  it('should import initial diagram', async function() {

    var container = document.createElement('div');
    container.style.height = '500px';
    container.style.border = 'solid 1px #666';

    document.body.appendChild(container);

    const response = await fetch('/base/test/fixtures/diagram.dmn');

    if (!response.ok) {
      throw new Error('failed to fetch diagram');
    }

    const text = await response.text();

    var dmnJS = new DmnJS({ container: container });

    return dmnJS.importXML(text);
  });

}


window.distroTest = distroTest;