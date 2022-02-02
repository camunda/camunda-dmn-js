describe('base-modeler', function() {

  it('should expose globals', function() {

    var DmnModeler = window.DmnModeler;

    // then
    expect(DmnModeler).to.exist;
    expect(new DmnModeler()).to.exist;
  });


  it('should import initial diagram', function(done) {

    var DmnModeler = window.DmnModeler;

    // then
    /* global testImport */
    testImport(DmnModeler, done);
  });

});